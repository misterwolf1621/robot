/*
  SerialPassthrough sketch

  Some boards, like the Arduino 101, the MKR1000, Zero, or the Micro, have one
  hardware serial port attached to Digital pins 0-1, and a separate USB serial
  port attached to the IDE Serial Monitor. This means that the "serial
  passthrough" which is possible with the Arduino UNO (commonly used to interact
  with devices/shields that require configuration via serial AT commands) will
  not work by default.

  This sketch allows you to emulate the serial passthrough behaviour. Any text
  you type in the IDE Serial monitor will be written out to the serial port on
  Digital pins 0 and 1, and vice-versa.

  On the 101, MKR1000, Zero, and Micro, "Serial" refers to the USB Serial port
  attached to the Serial Monitor, and "Serial1" refers to the hardware serial
  port attached to pins 0 and 1. This sketch will emulate Serial passthrough
  using those two Serial ports on the boards mentioned above, but you can change
  these names to connect any two serial ports on a board that has multiple ports.

  created 23 May 2016
  by Erik Nyquist

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/SerialPassthrough
*/

void setup() {
  Serial.begin(9600);
  Serial.print("recorded");
  Serial.println("selbe zeile wie vorher");

  Serial.print("abc\nabc\n\n\n");

  //pins direction
  pinMode(14, OUTPUT);
  pinMode(15, OUTPUT);

  //Motorspeed
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);

  //pinstatus

  pinMode(4, OUTPUT);
}

void loop() {
  if (Serial.available()) {        // If anything comes in Serial (USB),
    
    //"010 020"
    String spd = Serial.readString();
    
    int dirleft = atoi(spd.substring(0, 1).c_str());
    int dirright = atoi(spd.substring(1, 2).c_str());
    int left = atoi(spd.substring(3, 6).c_str());
    int right = atoi(spd.substring(7, 9).c_str());
    int water = atoi(spd.substring(10, 11).c_str());

    analogWrite(11, left);
    analogWrite(10, right);
    

    
    Serial.println(dirleft);
    Serial.println(dirright);
    Serial.println(left);
    Serial.println(right);
    Serial.println(water);
      
    
    
  }


}
