package controllers

import (
	"net/http"
	"os"

	"gocv.io/x/gocv"
)

// image transformation logic

func UploadImage(w http.ResponseWriter, r *http.Request) {
    file, _, err := r.FormFile("image")
    if err != nil {
        http.Error(w, "Unable to upload file", http.StatusBadRequest)
        return
    }
    defer file.Close()

    f, err := os.Create("uploaded_image.jpg")
    if err != nil {
        http.Error(w, "Unable to save file", http.StatusInternalServerError)
        return
    }
    defer f.Close()

    _, err = file.Seek(0, 0)
    if err != nil {
        http.Error(w, "Unable to read file", http.StatusInternalServerError)
        return
    }

    http.Error(w, "Image Uploaded Successfully!", http.StatusOK)
}

// Converting to Greyscale
func ConvertToGreyScale(w http.ResponseWriter, r *http.Request) {
    img := gocv.IMRead("uploaded_image.jpg", gocv.IMReadColor)
    if img.Empty() {
        http.Error(w, "Error loading the image", http.StatusInternalServerError)
        return
    }
    defer img.Close()

    gocv.CvtColor(img, &img, gocv.ColorBGRToGray)
    outputPath := "greyscale_image.jpg"
    gocv.IMWrite(outputPath, img)

    w.Header().Set("Content-Disposition", "attachment; filename=greyscale_image.jpg")
    w.Header().Set("Content-Type", "image/jpeg")

    http.ServeFile(w, r, outputPath) // Serve the file back to the client
}

// Converting to Black and White
func ConvertToBlackWhite(w http.ResponseWriter, r *http.Request) {
    img := gocv.IMRead("uploaded_image.jpg", gocv.IMReadColor)
    if img.Empty() {
        http.Error(w, "Error loading image", http.StatusInternalServerError)
        return
    }
    defer img.Close()

    gocv.CvtColor(img, &img, gocv.ColorBGRToGray)
    gocv.Threshold(img, &img, 128, 255, gocv.ThresholdBinary)
    outputPath := "blackwhite_image.jpg"
    gocv.IMWrite(outputPath, img)

    w.Header().Set("Content-Disposition", "attachment; filename=blackwhite_image.jpg")
    w.Header().Set("Content-Type", "image/jpeg")

    http.ServeFile(w, r, outputPath) // Serve the file back to the client
}
