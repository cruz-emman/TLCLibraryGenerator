import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";

import tlclibrary1 from "../assets/capture.png";
import tlclibrary2 from '../assets/capture1.png'

export const FormUpload = ({ Submit, handleChange, loading, error, title, dialogTitle, description, image1,image2 }) => {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{title} (.xlsx)</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1300px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full h-full">
              <img src={image1} className="object-contain w-full h-full " />
            </div>
            <p className="font-bold text-center">OR</p>
            <div className="w-full h-full">
              <img src={image2} className="object-contain w-full h-full " />
            </div>
          </div>
          <DialogFooter>
            <form
              onSubmit={Submit}
              className="flex flex-col w-full gap-2 pt-10"
            >
              <Separator className="h-1 bg-green-700/80" />

              <Input type="file" name="excel" onChange={handleChange} />
              <Button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload File"}
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </form>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
