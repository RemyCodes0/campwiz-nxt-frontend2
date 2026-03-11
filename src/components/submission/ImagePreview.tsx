import { Submission } from "@/types/submission";
import SubmissionDetails from "./preview/Details";
// import blurDataURL from "./blurDataURL";
import React from "react";

const ImagePreview = ({
  submission,
  votingComponent,
}: {
  submission: Submission;
  votingComponent: React.ReactNode;
}) => {
  return (
    <div>
      <img
        src={submission.url}
        alt={submission.title}
        width={Math.min(submission.thumbwidth, 400)}
        height={Math.min(submission.thumbheight, 400)}
      />
      {votingComponent}
      <SubmissionDetails submission={submission} />
    </div>
  );
};
export default ImagePreview;
