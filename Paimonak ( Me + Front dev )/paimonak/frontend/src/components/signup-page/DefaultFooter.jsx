import { Link } from "react-router-dom";

export default function DefaultFooter() {
  return (
    <div className="mt-4 text-sm flex gap-x-1">
      <p>حساب کاربری دارید؟</p>

      <Link to={"/login/password"} className="text-[#586070]">
        وارد شوید
      </Link>
    </div>
  );
}
