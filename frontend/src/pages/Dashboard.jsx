import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const [speakerA, setSpeakerA] = useState("");
  const [speakerAFile, setSpeakerAFile] = useState(null);

  const [message, setMessage] = useState("");

  const [speakers, setSpeakers] = useState([]);

  const loadSpeakers = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/speakers"
      );

      const data = await response.json();

      setSpeakers(data.speakers);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    loadSpeakers();

  }, []);

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

  const saveSpeaker = async (name, file) => {

    if (!name) {

      alert("Enter speaker name");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);

    if (audioBlob) {

      const recordedFile = new File(
        [audioBlob],
        "recorded.webm",
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

        alert("Record voice or select audio file");
        return;
      }

      formData.append(
        "file",
        file
      );
    }

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/save-speaker?name=${name}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessage(
        `${data.speaker} saved successfully`
      );

      loadSpeakers();

    } catch (error) {

      console.error(error);

      setMessage(
        "Save Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-3">
        Dashboard
      </h1>

      <p className="text-gray-400 mb-10">
        Manage speaker profiles and start recognition.
      </p>

      <div className="grid md:grid-cols-1 gap-8">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Speaker Enrollment
          </h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={speakerA}
            onChange={(e) => setSpeakerA(e.target.value)}
            className="w-full bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4"
          />

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSpeakerAFile(e.target.files[0])}
            className="w-full mb-4"
          />

          <div className="flex gap-3 mb-4">

            <button
              onClick={startRecording}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
            >
              Stop Recording
            </button>

          </div>

          <button
            onClick={() =>
              saveSpeaker(
                speakerA,
                speakerAFile
              )
            }
            className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl"
          >
            Save Speaker
          </button>

        </div>

      </div>

      <div className="mt-10">

        <Link to="/recognition">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl">
            Go To Recognition
          </button>
        </Link>

      </div>

      <div className="mt-6 text-green-400 text-lg">
        {message}
      </div>

      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          Saved Speakers
        </h2>

        {speakers.length === 0 ? (
          <p className="text-gray-400">
            No speakers enrolled
          </p>
        ) : (
          speakers.map((speaker, index) => (
            <p
              key={index}
              className="text-green-400 mb-2"
            >
              {speaker}
            </p>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;