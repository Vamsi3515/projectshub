#include <SoftwareSerial.h>

#define RELAY_PIN 7

void setup() {
    Serial.begin(9600);
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, LOW);
}

void loop() {
    digitalWrite(RELAY_PIN, HIGH);
    if (Serial.available()) {
        String command = Serial.readStringUntil('\n');
        Serial.println("Received: " + command);

        if (command == "UNLOCK") {
            Serial.println("Unlocking...");
            digitalWrite(RELAY_PIN, LOW);
            delay(5000);
            Serial.println("Locking...");
            digitalWrite(RELAY_PIN, HIGH);
        }
    }
}