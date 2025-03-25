import { useState } from "react";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/ui/dialog";

import { LogoutSvg } from "@/ui/Icons";
import { useLogout } from "./useLogout";

function Logout({ className = "", icoSize = "35"}) {
  const { logout, isPending } = useLogout();

  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);

  function handleLogout() {
    logout(
      {},
      {
        onSuccess: () => {
          setLogoutAlertOpen(false);
        },
      },
    );
  }
  return (
    <>
      <div
        onClick={() => setLogoutAlertOpen(true)}
        className={`${className}`}
      >
        <button >
          <LogoutSvg size={icoSize} />
        </button>
      </div>

      <Dialog open={logoutAlertOpen} onOpenChange={setLogoutAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="mt-3 md:mt-0"
              variant="outline"
              onClick={() => setLogoutAlertOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={handleLogout}
            >
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Logout;
