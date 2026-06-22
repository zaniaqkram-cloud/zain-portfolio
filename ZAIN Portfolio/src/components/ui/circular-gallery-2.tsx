import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  borderRadius?: number;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  borderRadius: number;
  program!: Program;
  plane!: Mesh;
  scaleValue!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  baseScaleX: number = 0;
  baseScaleY: number = 0;
  targetScale: number = 1.0;
  currentScale: number = 1.0;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    borderRadius = 0,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);

          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);

          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;

    this.currentScale = lerp(this.currentScale, this.targetScale, 0.08);
    this.plane.scale.x = this.baseScaleX * this.currentScale;
    this.plane.scale.y = this.baseScaleY * this.currentScale;

    const planeOffset = this.baseScaleX / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scaleValue = this.screen.height / 1500;
    this.baseScaleY = (this.viewport.height * (900 * this.scaleValue)) / this.screen.height;
    this.baseScaleX = (this.viewport.width * (700 * this.scaleValue)) / this.screen.width;
    this.plane.scale.x = this.baseScaleX * this.currentScale;
    this.plane.scale.y = this.baseScaleY * this.currentScale;
    this.plane.program.uniforms.uPlaneSizes.value = [this.baseScaleX, this.baseScaleY];
    this.padding = 2;
    this.width = this.baseScaleX + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  autoScrollSpeed?: number;
}

export interface GalleryItem {
  image: string;
  text?: string;
}

class AppCore {
  container: HTMLElement;
  scrollSpeed: number;
  autoScrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: GalleryItem[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;
  boundOnPointerMove!: (e: MouseEvent) => void;
  boundOnPointerLeave!: () => void;
  isDown: boolean = false;
  start: number = 0;
  mouseX: number = -Infinity;
  mouseY: number = -Infinity;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      borderRadius = 0,
      scrollSpeed = 2,
      scrollEase = 0.05,
      autoScrollSpeed = 0.4,
    }: AppConfig,
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.autoScrollSpeed = autoScrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items: GalleryItem[] | undefined,
    bend: number = 1,
    borderRadius: number,
  ) {
    const defaultItems: GalleryItem[] = [
      { image: "https://picsum.photos/seed/1/800/600?grayscale" },
      { image: "https://picsum.photos/seed/2/800/600?grayscale" },
      { image: "https://picsum.photos/seed/3/800/600?grayscale" },
      { image: "https://picsum.photos/seed/4/800/600?grayscale" },
      { image: "https://picsum.photos/seed/5/800/600?grayscale" },
      { image: "https://picsum.photos/seed/16/800/600?grayscale" },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta = wheelEvent.deltaY;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
  }

  onPointerMove(e: MouseEvent) {
    const rect = (this.renderer.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  onPointerLeave() {
    this.mouseX = -Infinity;
    this.mouseY = -Infinity;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      );
    }
  }

  update() {
    if (!this.isDown) {
      this.scroll.target += this.autoScrollSpeed;
    }
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction: "right" | "left" =
      this.scroll.current > this.scroll.last ? "right" : "left";

    const vpX =
      this.mouseX >= 0
        ? (this.mouseX / this.screen.width) * this.viewport.width - this.viewport.width / 2
        : -Infinity;
    const vpY =
      this.mouseY >= 0
        ? -(this.mouseY / this.screen.height) * this.viewport.height + this.viewport.height / 2
        : -Infinity;

    if (this.medias) {
      let hoveredIndex = -1;
      this.medias.forEach((media, i) => {
        media.update(this.scroll, direction);
        if (vpX !== -Infinity) {
          const dx = Math.abs(vpX - media.plane.position.x);
          const dy = Math.abs(vpY - media.plane.position.y);
          if (dx < media.baseScaleX / 2 && dy < media.baseScaleY / 2) {
            hoveredIndex = i;
          }
        }
      });
      this.medias.forEach((media, i) => {
        media.targetScale = i === hoveredIndex ? 1.08 : 1.0;
      });
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);
    this.boundOnPointerLeave = this.onPointerLeave.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("wheel", this.boundOnWheel, { passive: true });
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: true });
    window.addEventListener("touchend", this.boundOnTouchUp);
    this.renderer.gl.canvas.addEventListener("mousemove", this.boundOnPointerMove);
    this.renderer.gl.canvas.addEventListener("mouseleave", this.boundOnPointerLeave);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl) {
      const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
      canvas.removeEventListener("mousemove", this.boundOnPointerMove);
      canvas.removeEventListener("mouseleave", this.boundOnPointerLeave);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }
}

export interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  autoScrollSpeed?: number;
  className?: string;
}

export function CircularGallery({
  items,
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  autoScrollSpeed = 0.4,
  className = "",
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const app = new AppCore(container, {
      items,
      bend,
      borderRadius,
      scrollSpeed,
      scrollEase,
      autoScrollSpeed,
    });

    return () => {
      app.destroy();
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, autoScrollSpeed]);

  return (
    <div
      className={`w-full h-full overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      ref={containerRef}
    />
  );
}

export default CircularGallery;
