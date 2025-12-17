interface SectionHeadingProps {
  title: string;
  description: string;
  align?: "center" | "left" | "right";
}

export default function Heading({
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`
        max-w-3xl mx-auto mb-12
        text-${align}
      `}
    >
      <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 dark:text-black">
        {title}{" "}

      </h2>

      <p className="text-lg text-gray-600 dark:text-gray-700">
        {description}
      </p>
    </div>
  );
}
