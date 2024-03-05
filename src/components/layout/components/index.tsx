import Link from "next/link";

export const SidebarItem = ({
  title,
  icon,
  active,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  href: string;
}) => {
  return (
    <div className="flex gap-3">
      <div
        className={`rounded-full ${
          active ? "bg-primary" : ""
        } h-7 w-7  flex items-center justify-center `}
      >
        {icon}
      </div>
      <Link href={href}>
        <p
          className={`font-bold text-lg self-center  hover:text-slate-900 ${
            active ? "text-slate-900" : "text-slate-500"
          }
            ${
              active ? "dark:text-white" : "dark:text-slate-500"
            }  dark:hover:text-white 
          `}
        >
          {title}
        </p>
      </Link>
    </div>
  );
};
