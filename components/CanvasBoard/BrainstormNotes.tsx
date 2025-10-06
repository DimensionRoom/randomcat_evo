"use client";
import React from "react";
import styles from "./BrainstormNotes.module.scss";

interface BrainstormNotesProps {
  brainstormNotes: string;
  onChange: (value: string) => void;
  onlineUsers: any[];
}

const BrainstormNotes = ({
  brainstormNotes,
  onChange,
  onlineUsers,
}: BrainstormNotesProps): JSX.Element => {
  return (
    <div className={styles.brainstormContainer}>
      <div className={styles.notesBox} data-notes="true">
        <textarea
          value={brainstormNotes}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Start writing your creative ideas here...

• What patterns do you see in the cards?
• How can you combine different concepts?
• What new ideas are emerging?
• What questions come to mind?`}
          className={styles.textArea}
        />
        <div className={styles.noteFooter}>
          <span>{brainstormNotes.length} characters</span>
          {/* <span>💡 Your notes will be included in the PDF export</span> */}
        </div>
      </div>
    </div>
  );
};

export default BrainstormNotes;