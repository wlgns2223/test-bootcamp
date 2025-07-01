import React, { useState } from "react";

interface SelectionFormProps {
  onSelectionChange?: (selections: { hobbies: string[]; gender: string; notifications: boolean }) => void;
  "data-testid"?: string;
}

export default function SelectionForm({ onSelectionChange, "data-testid": testId }: SelectionFormProps) {
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [notifications, setNotifications] = useState(false);

  const handleHobbyChange = (hobby: string) => {
    const newHobbies = hobbies.includes(hobby) ? hobbies.filter((h) => h !== hobby) : [...hobbies, hobby];
    setHobbies(newHobbies);
    onSelectionChange?.({
      hobbies: newHobbies,
      gender,
      notifications,
    });
  };

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
    onSelectionChange?.({
      hobbies,
      gender: selectedGender,
      notifications,
    });
  };

  const handleNotificationChange = (enabled: boolean) => {
    setNotifications(enabled);
    onSelectionChange?.({
      hobbies,
      gender,
      notifications: enabled,
    });
  };

  return (
    <div data-testid={testId} className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Preferences</h2>

      {/* 체크박스 그룹 - 취미 */}
      <div>
        <label className="block text-sm font-medium mb-2">Hobbies:</label>
        <div className="space-y-2">
          {["Reading", "Gaming", "Sports", "Music"].map((hobby) => (
            <label key={hobby} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
                data-testid={`hobby-${hobby.toLowerCase()}`}
                className="rounded"
              />
              <span>{hobby}</span>
            </label>
          ))}
        </div>
        <div data-testid="selected-hobbies" className="mt-2 text-sm text-gray-600">
          Selected: {hobbies.join(", ") || "None"}
        </div>
      </div>

      {/* 라디오 버튼 그룹 - 성별 */}
      <div>
        <label className="block text-sm font-medium mb-2">Gender:</label>
        <div className="space-y-2">
          {["Male", "Female", "Other"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => handleGenderChange(option)}
                data-testid={`gender-${option.toLowerCase()}`}
                className="rounded-full"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div data-testid="selected-gender" className="mt-2 text-sm text-gray-600">
          Selected: {gender || "None"}
        </div>
      </div>

      {/* 단일 체크박스 - 알림 */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => handleNotificationChange(e.target.checked)}
            data-testid="notifications-toggle"
            className="rounded"
          />
          <span>Enable notifications</span>
        </label>
        <div data-testid="notification-status" className="mt-2 text-sm text-gray-600">
          Notifications: {notifications ? "Enabled" : "Disabled"}
        </div>
      </div>
    </div>
  );
}
