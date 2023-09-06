const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", files.length && files[0].uploadedFile);
    formData.append("comment", commentValue);
    formData.append("content_id", classData.content_id);
    axios({
      method: "post",
      url: STREAMING_COMMENT_URL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("access_token") }
    });
    setCommentValue("");
    setFiles([]);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiles([...files, { uploadedFile: file }]);
  };