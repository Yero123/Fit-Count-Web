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
import { ProfileForm } from "./FormCreateExercises";

export function ModalCreateExercices() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear ejercicio</DialogTitle>
        </DialogHeader>

        <ProfileForm />
        {/* <div className="grid gap-2 py-2">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
