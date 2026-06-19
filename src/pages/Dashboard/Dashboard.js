import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import {
getApplications
}
from "../../services/applicationService";

import {
  useNavigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  UserContext,
} from "../../context/UserContext";

function Dashboard() {
  const navigate =
    useNavigate();

  const {
    user,
  } =
    useContext(
      UserContext
    );

  const applications =
getApplications();

  return (
    <Box p={5}>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >

            Welcome

            {" "}

            {

              user?.email ||

              "Guest"

            }

          </Typography>

        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={() =>
            navigate(
              "/application"
            )
          }
        >
          Start Application
        </Button>

      </Box>

      <Card
        sx={{
          mb: 4,
          p: 2,
        }}
      >

        <CardContent>

          <Typography variant="h6">

            Total Applications

          </Typography>

          <Typography
            variant="h2"
            color="primary"
          >

            {

              applications.length

            }

          </Typography>

        </CardContent>

      </Card>

      {

        applications.length === 0

        ?

        (

          <Paper
            sx={{
              p: 5,
              textAlign:
                "center",
            }}
          >

            <Typography
              variant="h6"
              mb={2}
            >

              No Applications Yet

            </Typography>

            <Button
              variant="outlined"
              onClick={() =>
                navigate(
                  "/application"
                )
              }
            >

              Create First Application

            </Button>

          </Paper>

        )

        :

        (

          <Grid
            container
            spacing={3}
          >

            {

              applications.map(
                (
                  app,
                  index
                ) => (

                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={index}
                  >

                    <Paper
                      sx={{
                        p: 3,
                      }}
                    >

                      <Typography>

                        <strong>

                          Name:

                        </strong>

                        {" "}

                        {

                          app.fullName

                        }

                      </Typography>

                      <Typography>

                        <strong>

                          Email:

                        </strong>

                        {" "}

                        {

                          app.email

                        }

                      </Typography>

                      <Typography>

                        <strong>

                          University:

                        </strong>

                        {" "}

                        {

                          app.university

                        }

                      </Typography>

                      <Typography>

                        <strong>

                          Skills:

                        </strong>

                        {" "}

                        {

                          app.skills

                        }

                      </Typography>

                    </Paper>

                  </Grid>

                )

              )

            }

          </Grid>

        )

      }

    </Box>
  );
}

export default Dashboard;