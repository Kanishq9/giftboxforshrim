"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ViewLetter() {
  const { id } = useParams();
  const [letterData, setLetterData] = useState<any>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      if (!id) return;
      const docRef = doc(db, "letters", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLetterData(docSnap.data());
      } else {
        console.error("No such letter!");
      }
    };

    fetchLetter();
  }, [id]);

  if (!letterData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="p-8 bg-pink-50 min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">💌 Your Special Gift</h1>

      {/* Render saved items */}
      {letterData.content.map((item: any, index: number) => (
        <div key={index} className="mb-4">
          {item.type === "photo" && (
            <img
              src={item.content}
              alt="Gift item"
              className="mx-auto rounded-lg shadow-lg w-80"
            />
          )}
          {item.type === "note" && (
            <p className="bg-yellow-200 p-3 rounded-lg">{item.content}</p>
          )}
          {/* Add doodle, voice, spotify rendering if needed */}
        </div>
      ))}
    </main>
  );
}
