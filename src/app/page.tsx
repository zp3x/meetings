"use client";

import {
    Background,
    Button, Card,
    Column,
    Flex, GlitchFx,
    Heading, HoloFx, Icon, IconButton, Input, LetterFx,
    Line,
    Logo, NumberInput,
    PasswordInput,
    Row, SmartImage,
    SmartLink, TiltFx
} from "@/once-ui/components";
import {useEffect, useState} from "react";

export default function Home() {

    const [meetingMemberCount, setMeetingMemberCount] = useState<number>(15);
    const [meetingAverageSalary, setMeetingAverageSalary] = useState<number>(2800);
    const [currentMeetingTime, setCurrentMeetingTime] = useState<number>(0);
    const [meetingFinish, setMeetingFinish] = useState<number>(0);
    const [meetingTimerStarted, setMeetingTimerStarted] = useState(false);
    const [burnedMoney, setBurnedMoney] = useState<number>(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | number | null = null;
        const calculateCostPerSecond = () => {
        // Assumption: 160 working hours per month, 7 hours per day, 20 working days
            const hourlySalary = meetingAverageSalary / 140;
            const costPerSecond = hourlySalary / 3600;
            return costPerSecond * meetingMemberCount;
        };

        if (meetingTimerStarted) {
            intervalId = setInterval(() => {
                setCurrentMeetingTime(prevTime => prevTime + 1);
                setBurnedMoney(prevMoney => prevMoney + calculateCostPerSecond());
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [meetingTimerStarted, meetingMemberCount, meetingAverageSalary]);


  return (
      <div>
          <Column fillWidth={true} content="center" align="center" flex={1}>
              { meetingTimerStarted ? (
                  <div>
                      <Background
                          mask={{
                              x: 0,
                              y: 48,
                              radius: 85
                          }}
                          position="absolute"
                          grid={{
                              display: true,
                              width: "0.25rem",
                              color: "brand-on-background-weak",
                              height: "0.25rem",
                          }}
                      />
                      <Background
                          mask={{
                              x: 80,
                              y: 0,
                              radius: 300,
                          }}
                          position="absolute"
                          gradient={{
                              display: true,
                              tilt: -35,
                              height: 50,
                              width: 125,
                              x: 100,
                              y: 40,
                              colorStart: "accent-solid-medium",
                              colorEnd: "static-transparent",
                          }}
                      />
                      <Background
                          mask={{
                              x: 100,
                              y: 0,
                              radius: 100,
                          }}
                          position="absolute"
                          gradient={{
                              display: true,
                              opacity: 100,
                              tilt: -35,
                              height: 50,
                              width: 120,
                              x: 120,
                              y: 35,
                              colorStart: "brand-solid-strong",
                              colorEnd: "static-transparent",
                          }}
                      />

                  <Row position="fixed" top="0" fillWidth horizontal="center" zIndex={3} paddingTop={"xl"}>

                          <TiltFx>

                              <Card width={"xl"} height={"l"} radius="l-4">
                                  <Column fillWidth={true} content={"center"} align={"center"} paddingTop={"xl"}>
                                      <Heading>Cost:</Heading>

                                          <Heading variant="display-default-xl" paddingTop={"l"} style={{
                                              fontWeight: 'bold',
                                              color: 'white',
                                              animation: 'flash 1.5s infinite alternate'
                                          }}>
                                              {burnedMoney.toFixed(2)}€

                                          </Heading>



                                  </Column>

                                  <Background
                                      mask={{ x: 0, y: 0, radius: 300 }}
                                      position="absolute"
                                      gradient={{
                                          display: true,
                                          tilt: -35,
                                          height: 50,
                                          width: 125,
                                          x: 100,
                                          y: 40,
                                          colorStart: "#ff6600",
                                          colorEnd: "#ff0000",
                                      }}
                                  />
                                  <Background
                                      mask={{ x: 100, y: 0, radius: 100 }}
                                      position="absolute"
                                      gradient={{
                                          display: true,
                                          opacity: 100,
                                          tilt: -35,
                                          height: 50,
                                          width: 120,
                                          x: 120,
                                          y: 35,
                                          colorStart: "#ff3300",
                                          colorEnd: "#ff0000",
                                      }}
                                  />
                              </Card>
                          </TiltFx>


                  </Row>
                  </div>
            ) : (

                <Column fillWidth paddingX="32" gap="12" horizontal="center" position="relative">
                    <Heading as="h2" variant="display-default-m">
                        Meeting Cost Calculator
                    </Heading>


                    <Row
                        marginY="32"
                        background="overlay"
                        fillWidth
                        radius="xl"
                        border="neutral-alpha-weak"
                        overflow="hidden"
                    >

                        <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                            <Background
                                mask={{
                                    x: 100,
                                    y: 0,
                                    radius: 75,
                                }}
                                position="absolute"
                                grid={{
                                    display: true,
                                    opacity: 50,
                                    width: "0.5rem",
                                    color: "neutral-alpha-medium",
                                    height: "1rem",
                                }}
                            />

                            <NumberInput
                                id="membercount"
                                label="Workers count"
                                onChange={(e) => setMeetingMemberCount(e)}
                                value={meetingMemberCount}
                                errorMessage={false}
                                radius="top"
                            />
                            <NumberInput
                                id="averagesalary"
                                label="Averagesalary"
                                radius="bottom"
                                onChange={(e) => setMeetingAverageSalary(e)}
                                value={meetingAverageSalary}
                            />
                            <Row fillWidth paddingY="24">
                                <Row onBackground="neutral-weak" fillWidth gap="24" vertical="center">
                                    <Line />/<Line />
                                </Row>
                            </Row>
                            <Column gap="-1" fillWidth>


                            </Column>
                            <Button
                                id="login"
                                label="Start meeting"
                                arrowIcon
                                fillWidth
                                onClick={() => {
                                    setMeetingTimerStarted(true)
                                }}
                            />
                        </Column>
                    </Row>
                </Column>

            )}
          </Column>
      </div>
  );
}
