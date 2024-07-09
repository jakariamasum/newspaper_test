const IndexPage: React.FC = () => {
    return (
        <>
            <div className="container my-4">
                <div className="bg-white p-4">
                    <h1 className="md:text-2xl text-md text-gray-700 mb-4 font-bold">
                        Terms and Conditions
                    </h1>
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
                    <div className="list-style">
                        <ul className="block space-y-3">
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
                    </div>
                    <h4 className="mb-2 font-bold">
                        Work &amp; Experience
                    </h4>
                    <ul className="list-style block space-y-3">
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
};
export default IndexPage;