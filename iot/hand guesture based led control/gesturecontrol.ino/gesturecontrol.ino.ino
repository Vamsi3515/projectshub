#define RELAY_PIN 7

void setup() {
    pinMode(RELAY_PIN, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    if (Serial.available()) {
        String command = Serial.readStringUntil('\n');
        command.trim();

        if (command == "ON") {
            digitalWrite(RELAY_PIN, HIGH);
            Serial.println("Bulb ON");
        } else if (command == "OFF") {
            digitalWrite(RELAY_PIN, LOW);
            Serial.println("Bulb OFF");
        }
    }
}
