import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const PostDetailSkeleton = () => {
  return (
    <Card className="w-full max-w-4xl mt-16 mx-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-7 w-[250px]" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardHeader>

      <Separator className="" />

      <CardContent className="space-y-4 pt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </CardContent>
    </Card>
  );
};

export default PostDetailSkeleton;
