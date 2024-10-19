// image processing API routes
package routes

import (
	"gosnap_backend/controllers"
	"github.com/gorilla/mux"
)

func RegisterImageRoutes(r *mux.Router) {
	r.HandleFunc("/api/image/upload", controllers.UploadImage).Methods("POST")
	r.HandleFunc("/api/image/greyscale",controllers.ConvertToGreyScale).Methods("POST")
	r.HandleFunc("/api/image/blackwhite",controllers.ConvertToBlackWhite).Methods("POST")
}