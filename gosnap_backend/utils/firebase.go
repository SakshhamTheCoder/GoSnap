// firebase configuration
package utils

import (
	"context"
	"log"
	"firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App
var AuthClient *auth.Client

func InitFirebase(){
	ctx:=context.Background()
	config:=&firebase.Config{ProjectID: ""}
	opt:=option.WithCredentialsFile("firebase-adminsdk.json")

	app,err:=firebase.NewApp(ctx, config, opt)
	if err!=nil{
		log.Fatalf("Error initializing Firebase App: %v",err)
	}

	FirebaseApp = app;

	authClient, err:= app.Auth(ctx)
	if err!=nil{
		log.Fatalf("Error initializing firebase auth client: %v", err)
	}

	AuthClient = authClient
}
