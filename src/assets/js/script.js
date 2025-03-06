const formatDate = (dateString) => {
  if (!dateString) return 'Không có dữ liệu'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Ngày không hợp lệ'

  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date)
}
const formatDate2 = (dateString) => {
  if (!dateString) return 'Không có dữ liệu'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Ngày không hợp lệ'

  const month = String(date.getMonth() + 1).padStart(2, '0') // Lấy tháng (bắt đầu từ 0)
  const day = String(date.getDate()).padStart(2, '0') // Lấy ngày
  const year = date.getFullYear() // Lấy năm

  return `${month}/${day}/${year}`
}
export { formatDate, formatDate2 }
