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

export { formatDate }
