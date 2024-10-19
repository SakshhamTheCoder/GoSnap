package main

import (
	"fmt"
	"gosnap_backend/routes"
	"gosnap_backend/utils"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	utils.InitFirebase()

	r:=mux.NewRouter()

	//registering the image processing routes
	routes.RegisterImageRoutes(r)
	//routes
	r.HandleFunc("/api/home",HomeHandler).Methods("GET")

	//middleware
	r.Use(utils.VerifyToken)

	//start server
	fmt.Println("Starting server on :8080....")
	log.Fatal(http.ListenAndServe(":8080",r))
}

func HomeHandler(w http.ResponseWriter,r *http.Request){
	w.Write([]byte("Welcome to GoSnap!"))
}