import { Submission } from "@/types/submission";
import { lazy, Suspense } from "react";
import SubmissionDetails from "./Details";
const VideoApp = lazy(() => import("./videoplayer"));


const VideoPreview = ({ submission }: { submission: Submission }) => {
    return (<>
        <Suspense fallback={<div>Loading...</div>}>
            <VideoApp poster={submission.thumburl} src={submission.url} height={submission.height} width={submission.width} />
        </Suspense>
        <SubmissionDetails submission={submission} />
    </>)
}
export default VideoPreview;