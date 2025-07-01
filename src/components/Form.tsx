import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormProps {
  initialData?: Partial<FormData>;
}

const Form: React.FC<FormProps> = ({ initialData = {} }) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData.name || "",
    email: initialData.email || "",
    message: initialData.message || "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // 에러 초기화
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.message.trim()) {
      newErrors.message = "메시지를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="form-container">
      <h2>연락처 폼</h2>

      {isSubmitted ? (
        <div className="success-message">
          <h3>제출 완료!</h3>
          <p>이름: {formData.name}</p>
          <p>이메일: {formData.email}</p>
          <p>메시지: {formData.message}</p>
          <button onClick={handleReset}>다시 작성</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름:</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="이름을 입력하세요"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일:</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">메시지:</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange("message")}
              placeholder="메시지를 입력하세요"
              rows={4}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <div className="form-actions">
            <button type="submit">제출</button>
            <button type="button" onClick={handleReset}>
              초기화
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
