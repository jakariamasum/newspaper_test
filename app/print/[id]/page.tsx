"use client";
import Image from "next/image";
import { useRef } from 'react';

const IndexPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Refresh the page to restore the original content
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-main block my-4 text-white mx-auto"
        onClick={handlePrint}
      >
        Print
      </button>
      <div ref={printRef} className="max-w-screen-md mx-auto block space-y-4 my-2">
        <Image
          src="/logo.svg"
          width={200}
          height={50}
          alt='logo'
          className='w-40'
        />
        <h1 className="md:text-2xl text-xl font-semibold leading-normal">
          China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent
        </h1>
        <div className='flex items-center space-x-1 my-4 text-sm'>
          <Image
            src={"/user/1.jpg" || "/default.jpg"}
            width={20}
            height={20}
            alt="ads"
            className='rounded-full'
          />
          <span>
          By
          </span>
          <strong>
          Armin Vans
          </strong>
          <span>
          August 7, 2019
          </span>
        </div>

        <div className="bg-white p-2">
          <Image
            src="/post/1.jpg"
            width={696}
            height={464}
            alt="ads"
            className='w-full h-auto'
          />
        </div>

        <div className='bg-white p-2 text-base block text-justify space-y-2'>
          <p className="mb-2">
              It is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point of using
              Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
              opposed to using Content here, content here, making it look like readable
              English.
          </p>
          <p className="mb-2">
              Many desktop publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for lorem ipsum will uncover many
              web sites still in their infancy. Various versions have evolved over the
              years, sometimes by accident, sometimes on purpose (injected humour and the
              like).
          </p>
          <h4 className="mb-2 font-bold">
              Key Responsibilities
          </h4>
          <ul className="list-disc ml-8">
              <li>
                  Be involved in every step of the product design cycle from discovery to
                  developer handoff and user acceptance testing.
              </li>
              <li>
                  Work with BAs, product managers and tech teams to lead the Product
                  Design
              </li>
              <li>
                  Maintain quality of the design process and ensure that when designs are
                  translated into code they accurately reflect the design specifications.
              </li>
              <li>
                  Accurately estimate design tickets during planning sessions.
              </li>
              <li>
                  Contribute to sketching sessions involving non-designersCreate, iterate
                  and maintain UI deliverables including sketch files, style guides, high
                  fidelity prototypes, micro interaction specifications and pattern
                  libraries.
              </li>
              <li>
                  Ensure design choices are data led by identifying assumptions to test
                  each sprint, and work with the analysts in your team to plan moderated
                  usability test sessions.
              </li>
              <li>
                  Design pixel perfect responsive UI’s and understand that adopting common
                  interface patterns is better for UX than reinventing the wheel
              </li>
              <li>
                  Present your work to the wider business at Show &amp; Tell sessions.
              </li>
          </ul>
          
          <Image
            src="/post/2.jpg"
            width={696}
            height={464}
            alt="ads"
            className='w-min mx-auto h-auto'
          />
          <h4 className="mb-2 font-bold">
              Work &amp; Experience
          </h4>
          
          <ul className="list-disc ml-8">
              <li>
              You have at least 3 years experience working as a Product Designer.
              </li>
              <li>You have experience using Sketch and InVision or Framer X</li>
              <li>
              You have some previous experience working in an agile environment – Think
              two-week sprints.
              </li>
              <li>You are familiar using Jira and Confluence in your workflow</li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default IndexPage;