import AudioPlayer from "@/components/submission/AudioPlayer";
import AudioPreview from "@/components/submission/AudioPreview";
import ImagePreview from "@/components/submission/ImagePreview";
import VideoApp from "@/components/submission/VideoPlayer";
import VideoPreview from "@/components/submission/VideoPreview";
import type { Submission } from "@/types/submission";
import { MediaType } from "@/types/round";

const testSubmission: Submission = {
  submissionId: "1",
  campaignId: "100",
  submittedById: "user123",
  participantId: "part456",
  url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  title: "Test Audio",
  description: "This is a test audio submission",
  author: "Remy Christophe",
  createdAtServer: new Date().toISOString(),
  width: 1801,
  height: 224,
  thumbwidth: 200,
  thumbheight: 150,
  mediatype: MediaType.AUDIO,
  duration: 60000, // 1 minute in ms
  size: 1024 * 500, // bytes
  bitrate: 128,
};
const SubmissionListPage = () => {
    return (
        <div>
            <h1>Submission List</h1>
            <h3>Audio Player Component</h3>
            <AudioPlayer
        src="/audio/test.mp3"
        title="My Audio Title"
        author="Remy Christophe"
      />
      <hr />
      <h3>
 <AudioPreview submission={testSubmission} />
      </h3>
      <hr />
      <div>
<h3>Image Preview Component</h3>
      <ImagePreview
        submission={testSubmission}
        votingComponent={<button>Vote</button>}
      />
    </div>
    <hr />
    <div>
    <h3>Video Player Component</h3>
      <VideoApp
        src={testSubmission.url}
        poster="https://via.placeholder.com/640x360.png?text=Video+Poster"
        width={testSubmission.width}
        height={testSubmission.height}
        onPosterLoaded={(e) => console.log("Poster loaded", e)}
      />
    </div>
    <div>
      <h1>Video Preview Test</h1>

      <VideoPreview submission={testSubmission} />
    </div>
        </div>
        
    );
}
export default SubmissionListPage;