import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { clearAuth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { startsWith } from 'zod';

const AccountPopUP = () => {
 
    return (
      <div
        className="absolute top-24 right-8 w-full max-w-[250px] pb-5 rounded-md
                    flex flex-col gap-4 bg-[#FFFFFF] px-5 shadow-lg z-50"
      >
        <div className="w-full pt-6">
          <Link href="/account-settings">
            <Button
              className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
            >
              <Label
                htmlFor="profile-settings"
                className="text-[#000000] font-poppins 
                                cursor-pointer text-base"
              >
                Profile Settings
              </Label>
              <Image
                src="/user-logo.svg"
                alt="user-logo"
                height={15}
                width={20}
                className=""
              />
            </Button>
          </Link>
        </div>

        <div className="w-full">
          <Link href="/saved-properties">
            <Button
              className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
            >
              <Label
                htmlFor="profile-settings"
                className="text-[#000000] 
                                    font-poppins cursor-pointer text-base"
              >
                Saved Properties
              </Label>
              <Image
                src="/bookmark.svg"
                alt="bookmark-logo"
                height={15}
                width={20}
                className=""
              />
            </Button>
          </Link>
        </div>

        <div className="w-full">
          <Link href="/listings">
            <Button
              className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
            >
              <Label
                htmlFor="listings"
                className="text-[#000000] font-poppins 
                                cursor-pointer text-base"
              >
                Listings
              </Label>
              <Image
                src={"/list.svg"}
                alt="list-logo"
                height={15}
                width={20}
                className=""
              />
            </Button>
          </Link>
        </div>

        <div className="w-full flex items-center gap-2 pl-4">
          <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
          <p className="text-[#A4A3A3] font-poppins">and</p>
          <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
        </div>

        <div className="w-full">
          <Button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
          >
            <Label
              htmlFor="privacy-policy"
              className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
            >
              Privacy Policy
            </Label>
          </Button>
        </div>

        
        <div className="w-full">
          <Button
            onClick={() => clearAuth()}
            className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
          >
            <Label
              htmlFor="logout"
              className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
            >
              Logout
            </Label>
          </Button>
        </div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl text-center mb-3">
              Zonify – Terms & Policy
            </h3>
            <p className="text-center text-sm text-gray-400 mb-4">
              Effective Date: October 25, 2025 | Last Updated: October 25, 2025
            </p>
            <div className="divider border-gray-700"></div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[70vh] pr-3  text-sm leading-relaxed text-black">
              <p>
                Welcome to <strong>Zonify</strong>, a real estate booking and
                zoning platform that helps users explore property listings,
                zoning details, and connect with verified property owners or
                agents. By using our website or mobile services, you agree to
                the following Terms and Policies.
              </p>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  1. Property Listings
                </h4>
                <p>
                  Zonify displays properties provided by owners, agents, or
                  developers. While we make every effort to ensure the accuracy
                  of property details (location, pricing, zoning information,
                  and photos), Zonify does not guarantee that all information is
                  complete, current, or error-free. We recommend users verify
                  details directly with property representatives before making
                  decisions.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  2. Booking & Site Visits
                </h4>
                <p>
                  Users can request property visits, consultations, or bookings
                  through our platform. Visit confirmation and scheduling are
                  managed directly between users and the respective property
                  agents or owners. Zonify acts only as a connecting platform
                  and is not responsible for visit cancellations, disputes, or
                  financial transactions.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  3. User Accounts & Data
                </h4>
                <p>
                  To use certain features (like saving listings or scheduling
                  visits), users may be required to create an account. You are
                  responsible for maintaining the confidentiality of your
                  account credentials and agree to provide accurate information.
                  Zonify will not be liable for unauthorized access to your
                  account due to negligence or credential sharing.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  4. Privacy Policy
                </h4>
                <p>
                  We value your privacy. Zonify collects only the information
                  necessary to facilitate property listings, booking, and
                  communication. Your data will never be sold to third parties.
                  It may, however, be shared with verified partners only for
                  service-related purposes (such as scheduling a visit).
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  5. Zoning & Legal Information
                </h4>
                <p>
                  Zonify provides zoning information sourced from public or
                  verified datasets. We do not provide legal or financial
                  advice. Users should independently confirm zoning regulations
                  or land use restrictions with the relevant authorities before
                  purchasing or developing any property.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  6. User Responsibilities
                </h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    Do not upload false or misleading property information.
                  </li>
                  <li>Respect all local property laws and regulations.</li>
                  <li>
                    Use Zonify’s platform only for lawful real estate browsing
                    and booking purposes.
                  </li>
                  <li>
                    Report suspicious or fraudulent listings to our support team
                    immediately.
                  </li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  7. Payments & Transactions
                </h4>
                <p>
                  All monetary transactions (deposits, bookings, or purchases)
                  occur directly between users and property representatives.
                  Zonify does not handle, store, or guarantee any financial
                  transaction. We strongly encourage users to confirm payment
                  legitimacy before transferring any funds.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  8. Limitation of Liability
                </h4>
                <p>
                  Zonify provides a platform for property discovery and zoning
                  insights “as is.” We are not responsible for any direct,
                  indirect, or consequential loss arising from use of the
                  platform or reliance on property information displayed here.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">
                  9. Policy Updates
                </h4>
                <p>
                  Zonify may update these terms periodically to improve
                  transparency and compliance. Any major updates will be
                  reflected on this page with the “Last Updated” date. Continued
                  use of Zonify after changes implies acceptance of the revised
                  policy.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-1">10. Contact Us</h4>
                <p>
                  If you have questions, complaints, or suggestions about our
                  Terms & Policy, please contact us at:
                </p>
                <p className="mt-1 font-medium text-gray-600">
                  📧 support@zonify.com
                </p>
              </section>
            </div>
          </div>
        </dialog>
      </div>
    );
};

export default AccountPopUP;