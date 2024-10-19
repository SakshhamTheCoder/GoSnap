package utils

import (
    "context"
    "fmt"
    "net/http"
)

func VerifyToken(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Get the token from Authorization header
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Missing Authorization Header", http.StatusUnauthorized)
            return
        }

        idToken := authHeader[len("Bearer "):]

        // Verify token with Firebase
        token, err := AuthClient.VerifyIDToken(context.Background(), idToken)
        if err != nil {
            http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
            return
        }

        // Token is valid, proceed with the request
        fmt.Printf("Verified token: %v\n", token)
        next.ServeHTTP(w, r)
    })
}
