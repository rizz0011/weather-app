import React, { useEffect, useState } from "react";
import { Box, Stack, IconButton, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import cloudImg from "../Asset/4102326_cloud_sun_sunny_weather_icon (2).png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [search, setSearch] = useState("");
  const [tempData, setTempData] = useState();
  const [city, setCity] = useState();
  const [windSpeed, setWindSpeed] = useState()
  const [weather, setWeather] = useState([])



  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    if(search){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=9828f65085553b707e59d7caf84a600a`;
       
        
          const response = await fetch(url);
          const result = await response.json();
          if(result?.cod === '404'){
            toast.error('City Not Found!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              return
          }
          setTempData(result?.main);
          setCity(result?.name);
          setWindSpeed(result?.wind)
          setWeather(result?.weather)
       
        return
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=basti&units=Metric&appid=9828f65085553b707e59d7caf84a600a`;
      const response = await fetch(url);
      const result = await response.json();
      setTempData(result?.main);
      setCity(result?.name);
      setWindSpeed(result?.wind)
      setWeather(result?.weather)
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Box>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ width: "95vw", height: "90vh" }}
      >
        <Card sx={{ width: 325, backgroundColor: "#9800ff5e", p: 2 }}>
          <Stack>
            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ border:'3px solid white' }}
                id="outlined-adornment-password"
                size="small"
                value={search}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={fetchData}>
                      <SearchIcon sx={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Search City..."
              />
            </FormControl>
          </Stack>

          <CardContent>
            <Stack spacing={2}>
              <Stack justifyContent="center" alignItems="center">
                <img src={cloudImg} alt="" />
               {weather?.map((i, index) => (
                <Typography key={index} sx={{ fontSize: "28px", color: "white", fontWeight: 600 , textTransform:'capitalize'}}>{i?.description}</Typography>
               ))}
                <Typography
                  sx={{ fontSize: "36px", color: "white", fontWeight: 600 }}
                >
                  {Math.round(`${tempData?.temp}`)}&deg;c
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: "28px",
                      color: "white",
                      marginRight: "10px",
                    }}
                  />

                  <Typography sx={{ fontSize: "24px", color: "white" }}>
                    {city?.toUpperCase()}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
              <Grid container spacing={1} sx={{mt:'10px'}}>
                <Grid item sm={9} xs={9}>
                <Stack
                  direction="row"
                
                  
                >
                  <AirIcon
                    sx={{
                      fontSize: "28px",
                      color: "white",
                    }}
                  />

                  <Typography sx={{ fontSize: "18px", color: "white" }}>
                  {windSpeed?.speed*2} Km/h
                  </Typography>
                </Stack>
                <Stack>
                <Typography sx={{ fontSize: "16px", color: "white" }}>Wind Speed</Typography>
                </Stack>
                </Grid>

                <Grid item sm={3} xs={3}>
                <Stack
                  direction="row"
                  
                
                >
                  <ThermostatIcon
                    sx={{
                      fontSize: "28px",
                      color: "white",
                    }}
                  />

                  <Typography sx={{ fontSize: "18px", color: "white" }}>
                {tempData?.humidity}
                  </Typography>
                </Stack>
                <Stack>
                <Typography sx={{ fontSize: "16px", color: "white" }}>Humidity</Typography>
                </Stack>
                </Grid>

              </Grid>
          </CardContent>
        </Card>
      </Stack>
      <ToastContainer />
    </Box>
  );
}

export default Home;
