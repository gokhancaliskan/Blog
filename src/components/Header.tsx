import Link from "next/link";
import { useTranslation } from "next-i18next";

const Header = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/youtube">Youtube</Link>
				</li>
				<li>
					<Link href="/software">Software</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>

				<li>
					<button>EN</button>
				</li>
				<li>
					<button>TR</button>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
