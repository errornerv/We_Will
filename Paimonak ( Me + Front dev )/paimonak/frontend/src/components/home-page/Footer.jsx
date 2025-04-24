export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      {/* <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav> */}
      <div className="text-xl flex w-full justify-center -mb-9">
        <h3>ارتباط با ما</h3>
        <div className="divider divider-horizontal"></div>
        <h3>Contact Us</h3>
      </div>
      <nav>
        <p>
          Telegram : @Paimonak
          <br />
          Website: WeWillClub.com
        </p>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - تمامی حقوق برای مجموعه وی‌ویل
          محفوظ می‌باشد.‍
        </p>
      </aside>
    </footer>
  );
}
