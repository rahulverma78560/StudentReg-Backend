export default function generateResponse(
  message,
  status,
  payload,
) {
  const apiResponse = {
    message: message,
    code: status,
    payload: payload ? payload : null,
  };
  return apiResponse;
}
