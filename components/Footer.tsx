import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoIosCall, IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#8f613c] text-white py-8 pl-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul>
              <li><Link href="/about" className="hover:text-[#f0d5a6] transition-colors">About Us</Link></li>
              <li><Link href="/menu" className="hover:text-[#f0d5a6] transition-colors">Menu</Link></li>
              <li><Link href="/contact" className="hover:text-[#f0d5a6] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#f0d5a6] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <ul>
              <li className="flex items-center">
                <IoIosCall className="mr-2" />
                <span>(+123) 456 7890</span>
              </li>
              <li className="flex items-center">
                <IoIosMail className="mr-2" />
                <span>info@fooddelivery.com</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#f0d5a6] transition-colors">
                <FaFacebookF />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#f0d5a6] transition-colors">
                <FaInstagram />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#f0d5a6] transition-colors">
                <FaTwitter />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#f0d5a6] transition-colors">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg">Newsletter</h3>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 rounded-md mb-4 bg-white text-[#8f613c] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#f0d5a6] text-[#8f613c] p-2 rounded-md hover:bg-[#8f613c] hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom section: Copyright */}
        <div className="border-t border-white mt-8 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Food Delivery. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
