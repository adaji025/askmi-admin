import { Settings } from "lucide-react";

const EmptySettings = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <Settings className="h-12 w-12 text-[#8B5CF6] mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">
          Select a question type to see its settings.
        </p>
      </div>
    </div>
  );
};

export default EmptySettings;
