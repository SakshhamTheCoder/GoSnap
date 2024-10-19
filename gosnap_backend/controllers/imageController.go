package controllers

import (
	"fmt"
	"net/http"
	"os"

	"gocv.io/x/gocv"
)

// image transformation logic

func UploadImage(w http.ResponseWriter, r *http.Request){
	file, _,err := r.FormFile("image")
	if err!=nil{
		http.Error(w, "Unable to upload file", http.StatusBadRequest)
		return
	}

	defer file.Close()

	f, err:=os.Create("uploaded_image.jpg")
	if err!=nil{
		http.Error(w, "Unable to save file", http.StatusInternalServerError)
		return
	}

	defer f.Close()

	_,err = file.Seek(0,0)
	if err!=nil{
		http.Error(w,"Unable to read file", http.StatusInternalServerError)
		return
	}

	fmt.Println(w, "Image Uploaded Succesfully!")
}

//Converting to GreyScale
func ConvertToGreyScale(w http.ResponseWriter, r *http.Request){
	img:=gocv.IMRead("uploaded_image.jpg",gocv.IMReadColor)
	if img.Empty(){
		http.Error(w, "Error loading the image", http.StatusInternalServerError)
		return
	}
	defer img.Close()

	//now converting the read image to greyscale

	gocv.CvtColor(img,&img,gocv.ColorBGRToGray)
	gocv.IMWrite("greyscale_image.jpg",img)
	fmt.Fprintln(w, "Image Converted To GreyScale")
}

//Converting to Black and White
func ConvertToBlackWhite(w http.ResponseWriter, r *http.Request){
	img:=gocv.IMRead("uploadd_image.jpg", gocv.IMReadColor)
	if img.Empty(){
		http.Error(w, "Error loading image", http.StatusInternalServerError)
		return
	}
	defer img.Close()

	//convert now the img to black and white
	gocv.CvtColor(img, &img, gocv.ColorBGRToGray)
	gocv.Threshold(img, &img, 128, 255, gocv.ThresholdBinary)

	gocv.IMWrite("blackwhite_image.jpg", img)
	fmt.Println(w,"Img converted to bnw")
}
