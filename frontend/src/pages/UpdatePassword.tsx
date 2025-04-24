import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import ArrowBackIcon from "../icons/ArrowBackIcon";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import PasswordIcon from "../icons/PasswordIcon";
import Button from "../components/Button";
import Loader from "../components/Loader";

function UpdatePasswordPage() {
  const { updatePassword, isUpdatingPassword } = useAuthStore();
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  async function handleUpdatePassword() {
    await updatePassword(formData);
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5 pt-18 max-w-[calc(1350px)] m-auto  border-t-1 dark:border-zinc-800 border-indigo-100 relative ">
        <span>
          <Link
            to="/dashboard"
            className="px-5 py-2 text-sm rounded-lg dark:bg-zinc-800/60 bg-indigo-100 hover:dark:bg-zinc-800 hover:scale-x-103 absolute top-5 left-5 flex gap-2 items-center cursor-pointer transition-all"
          >
            Back <ArrowBackIcon className="size-4" />{" "}
          </Link>
        </span>
        <p className="md:text-2xl text-xl font-medium">Change your password</p>

        <form className=" transition-all flex flex-col items-center gap-5 p-5  rounded-lg ">
          <Input
            icon={<PasswordIcon />}
            type={showPassword ? "text" : "password"}
            id="oldPassword"
            placeholder="Old Password"
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            value={formData.oldPassword}
            name="Old password"
            minLength={8}
            maxLength={16}
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
            title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
            required={true}
          />
          <Input
            icon={<PasswordIcon />}
            type={showPassword ? "text" : "password"}
            id="newPassword"
            placeholder="New Password"
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            value={formData.newPassword}
            name="New password"
            minLength={8}
            maxLength={16}
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
            title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
            required={true}
          />
          <Input
            icon={<PasswordIcon />}
            type={showPassword ? "text" : "password"}
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            onChange={(e) =>
              setFormData({ ...formData, confirmNewPassword: e.target.value })
            }
            value={formData.confirmNewPassword}
            name="Confirm new password"
            minLength={8}
            maxLength={16}
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
            title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
            required={true}
          />

          <Button
            disabled={isUpdatingPassword}
            type="submit"
            variant="primary"
            text={isUpdatingPassword ? <Loader /> : "Update"}
            onClick={handleUpdatePassword}
          ></Button>
        </form>
      </div>
    </>
  );
}

export default UpdatePasswordPage;
