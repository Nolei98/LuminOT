import Image from "next/image";

export function PedrasDivider() {
  return (
    <div className="pointer-events-none -my-4 flex justify-center" aria-hidden="true">
      <Image
        src="/assets/portal/pedras_trevas.webp"
        alt=""
        width={500}
        height={350}
        className="motion-float w-64 opacity-80 md:w-80"
        style={{ animationName: "float-y", animationDuration: "7s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
      />
    </div>
  );
}
