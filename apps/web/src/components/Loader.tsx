import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <Loader className="animate-spin" />
    </div>
  );
};
