import { useState } from "react";

function Recognition() {

  const [file, setFile] = useState(null);

  const [speaker, setSpeaker] = useState("");
  const [confidence, setConfidence] = useState("");

  const [message, setMessage] = useState("");

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);

    const chunks = [];

    recorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    recorder.onstop = () => {

      const blob = new Blob(chunks, {
        type: "audio/webm",
      });

      setAudioBlob(blob);

      setMessage("Recording Saved");
    };

    recorder.start();

    setMediaRecorder(recorder);

    setMessage("Recording Started...");
  };

  const stopRecording = () => {

    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const recognizeAudio = async () => {

    const formData = new FormData();

    if (audioBlob) {

      const recordedFile = new File(
        [audioBlob],
        "test_voice.webm",
        {
          type: "audio/webm",
        }
      );

      formData.append(
        "file",
        recordedFile
      );

    } else {

      if (!file) {
        alert("Select audio file or record voice");
        return;
      }

      formData.append(
        "file",
        file
      );
    }

    try {

     const response = await fetch(
  "https://speaker-recognition-system-tzg6.onrender.com/recognize",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setSpeaker(data.speaker);

      setConfidence(data.confidence);

      setMessage(
        "Recognition Successful"
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Recognition Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-3">
        Speaker Recognition
      </h1>

      <p className="text-gray-400 mb-10">
        Upload audio or record live voice for analysis.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Upload Audio
          </h2>

          <input
            type="file"
            accept="audio/*"
            className="w-full"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Record Voice
          </h2>

          <div className="flex gap-3">

            <button
              onClick={startRecording}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
            >
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-xl"
            >
              Stop Recording
            </button>

          </div>

        </div>

      </div>

      <div className="mt-10">

        <button
          onClick={recognizeAudio}
          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl"
        >
          Analyze Voice
        </button>

      </div>

      <div className="mt-6 text-green-400">
        {message}
      </div>

      <div className="mt-12 bg-gray-900 border border-gray-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Result
        </h2>

        <p className="text-xl">
          Detected Speaker:
          <span className="text-purple-400 font-bold ml-2">
            {speaker || "---"}
          </span>
        </p>

        <p className="mt-4 text-gray-400">
          Confidence Score: {confidence || "---"}%
        </p>

      </div>

    </div>
  );
}

export default Recognition;