package svalidate

import "unicode/utf8"

func IsASCII(s string) bool {
	return utf8.ValidString(s) && utf8.RuneCountInString(s) == len(s)
}
