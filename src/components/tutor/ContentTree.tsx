import React, { useState } from "react";
import { ChevronRight, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TreeItem = {
  title: string;
  path: string;
  description?: string;
  items?: TreeItem[];
};

type ContentTreeProps = {
  items: TreeItem[];
  onAssign: (content: { title: string; path: string; description: string }) => Promise<void>;
};

const ContentTree = ({ items, onAssign }: ContentTreeProps) => {
  const [assignedPaths, setAssignedPaths] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path)
        ? prev.filter((p) => p !== path)
        : [...prev, path]
    );
  };

  const handleAssign = async (item: TreeItem) => {
    await onAssign({
      title: item.title,
      path: item.path,
      description: item.description || "",
    });
    setAssignedPaths((prev) => [...prev, item.path]);
  };

  const renderItem = (item: TreeItem, level: number = 0) => {
    const hasChildren = item.items && item.items.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const isAssigned = assignedPaths.includes(item.path);

    return (
      <div key={item.path} className="space-y-1">
        <div
          className={cn(
            "flex items-center gap-2",
            level > 0 && "ml-4"
          )}
        >
          {hasChildren ? (
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                isExpanded && "rotate-90"
              )}
              onClick={() => toggleExpand(item.path)}
            />
          ) : (
            <File className="h-4 w-4 shrink-0" />
          )}
          <span className="flex-grow">{item.title}</span>
          {!hasChildren && (
            <div className="flex items-center gap-2">
              {isAssigned ? (
                <span className="text-sm text-green-600 font-medium">
                  Asignado ✓
                </span>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAssign(item)}
                >
                  Asignar
                </Button>
              )}
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="pl-4">
            {item.items?.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return <div className="space-y-2">{items.map((item) => renderItem(item))}</div>;
};

export default ContentTree;