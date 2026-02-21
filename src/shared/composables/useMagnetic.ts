import { ref, onMounted, onUnmounted, type Ref } from "vue";
import gsap from "gsap";

export function useMagnetic(target: Ref<HTMLElement | null>) {
  const x = ref(0);
  const y = ref(0);

  const mouseMove = (e: MouseEvent) => {
    if (!target.value) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = target.value.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply magnetic effect: move towards cursor but with a limit
    // Adjusting these values changes the "strength"
    const strength = 40;

    gsap.to(target.value, {
      x: distanceX * (strength / width),
      y: distanceY * (strength / height),
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const mouseLeave = () => {
    if (!target.value) return;

    gsap.to(target.value, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  onMounted(() => {
    if (target.value) {
      target.value.addEventListener("mousemove", mouseMove);
      target.value.addEventListener("mouseleave", mouseLeave);
    }
  });

  onUnmounted(() => {
    if (target.value) {
      target.value.removeEventListener("mousemove", mouseMove);
      target.value.removeEventListener("mouseleave", mouseLeave);
    }
  });

  return { x, y };
}
