package stime

import "time"

// DaysInMonth はその月の日数を返す
func DaysInMonth(month int) int {
	return time.Date(time.Now().Year(), time.Month(month+1), 0, 0, 0, 0, 0, time.UTC).Day()
}

func Month() int {
	return int(time.Now().Month())
}
