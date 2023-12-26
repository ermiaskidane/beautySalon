"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-xl font-bold text-gray-900">
        {title}
      </div>
      <div className="font-light mt-2 text-[#1972f5]">
        {subtitle}
      </div>
    </div>
  )
}

export default Heading;