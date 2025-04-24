import DefaultHeader from "../../components/signup-page/DefaultHeader";
import FirstPageForm from "../../components/signup-page/FirstPageForm";

export default function SignupFirstPage() {
  return (
    <div className="hidden max-640:block justify-center items-center">
      <DefaultHeader>
        <h2 className="text-center font-bold text-xl -mt-4">ثبت نام</h2>
        <FirstPageForm />
      </DefaultHeader>
    </div>
  );
}
