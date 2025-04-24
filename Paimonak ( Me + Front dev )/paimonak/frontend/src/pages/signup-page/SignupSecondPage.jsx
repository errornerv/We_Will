import DefaultHeader from "../../components/signup-page/DefaultHeader";
import SecondPageForm from "../../components/signup-page/SecondPageForm";

export default function SignupSecondPage() {
  return (
    <div className="hidden max-640:block justify-center items-center">
      <DefaultHeader>
        <h2 className="text-center font-bold text-xl -mt-4">ثبت نام</h2>
        <SecondPageForm />
      </DefaultHeader>
    </div>
  );
}
