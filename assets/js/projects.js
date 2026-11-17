/* Project data + card grid + detail drawer. Used by index.html (featured subset) and projects.html (all). */
(function(){
'use strict';
const GH='https://github.com/karthikeyan-manimaran/';
const I='assets/img/', C=I+'capstone/', U=I+'ugv/';

/* tiny schematic thumbnails for projects without photos */
const S=(body)=>`<svg viewBox="0 0 200 110" fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const T='var(--c-cobalt)',A='var(--c-signal)',P='var(--c-ink)',G='var(--c-ink)';
const ART={
swarm:S(`<g stroke="${T}" stroke-width="1.4"><circle cx="100" cy="30" r="9" stroke="${A}"/><path d="M92 30h16M100 22v16" stroke="${A}"/>${[[40,70],[70,82],[100,74],[130,82],[160,70]].map(([x,y])=>`<rect x="${x-7}" y="${y-4}" width="14" height="8" rx="2"/><path d="M${x-12} ${y-6}h8M${x+4} ${y-6}h8" />`).join('')}</g><g stroke="${A}" stroke-dasharray="3 4" stroke-width="1" opacity=".6"><path d="M100 39L40 66M100 39L70 78M100 39v31M100 39L130 78M100 39L160 66"/></g>`),
terrain:S(`<g stroke="${T}" stroke-width="1"><path d="M10 80 Q40 50 70 70 T130 60 T190 78" stroke-width="1.6"/>${[...Array(11)].map((_,i)=>`<path d="M${20+i*16} 18v${30+((i*13)%14)}" opacity=".35"/>`).join('')}</g><g fill="${T}">${[...Array(24)].map((_,i)=>`<circle cx="${14+i*7.5}" cy="${62+Math.sin(i*.7)*10+(i%3)*5}" r="1.3"/>`).join('')}</g><rect x="88" y="14" width="24" height="9" rx="2" stroke="${A}" stroke-width="1.5"/>`),
rl:S(`<g stroke="${T}" stroke-width="1.5"><rect x="80" y="20" width="40" height="12" rx="3"/><path d="M80 24l-22-8M120 24l22-8"/></g><rect x="70" y="90" width="60" height="6" stroke="${A}" stroke-width="1.5"/><path d="M100 36q-40 10 0 50" stroke="${A}" stroke-dasharray="3 4" stroke-width="1.2"/><path d="M96 80l4 8 4-8" stroke="${A}" stroke-width="1.5"/>`),
dock:S(`<g stroke="${A}" stroke-width="1.5"><rect x="30" y="58" width="50" height="22" rx="3"/><circle cx="42" cy="84" r="7"/><circle cx="68" cy="84" r="7"/></g><g stroke="${T}" stroke-width="1.4"><rect x="140" y="44" width="30" height="36"/><rect x="148" y="52" width="6" height="6" fill="${T}"/><rect x="157" y="60" width="6" height="6" fill="${T}"/></g><path d="M84 68h50" stroke="${T}" stroke-dasharray="4 4"/>`),
rag:S(`<g stroke="${G}" stroke-width="1.4"><rect x="12" y="44" width="34" height="22" rx="3"/><rect x="82" y="14" width="40" height="18" rx="3"/><rect x="82" y="46" width="40" height="18" rx="3"/><rect x="82" y="78" width="40" height="18" rx="3"/><rect x="158" y="44" width="30" height="22" rx="3"/><path d="M46 55h20l16-32M66 55h16M66 55l16 32M122 23l20 32h16M122 55h36M122 87l20-32"/></g>`),
voice:S(`<g stroke="${P}" stroke-width="1.5">${[...Array(21)].map((_,i)=>`<path d="M${20+i*8} ${55-Math.abs(Math.sin(i*.8))*30}v${Math.abs(Math.sin(i*.8))*60}"/>`).join('')}</g>`),
care:S(`<g stroke="${G}" stroke-width="1.5"><path d="M100 86C50 56 60 24 100 42c40-18 50 14 0 44z"/><path d="M40 60h28l8-14 10 28 8-14h22" stroke="${T}"/></g>`),
learn:S(`<g stroke="${T}" stroke-width="1.5"><rect x="30" y="22" width="70" height="46" rx="3"/><path d="M42 36h46M42 46h30M42 56h38"/><rect x="112" y="34" width="58" height="46" rx="3" stroke="${A}"/><path d="M124 48h34M124 58h24" stroke="${A}"/></g>`),
vo:S(`<g stroke="${T}" stroke-width="1.6"><path d="M14 86C50 80 60 50 92 54s40-30 94-34"/></g><g stroke="${A}" stroke-width="1.3" stroke-dasharray="3 3"><rect x="58" y="28" width="30" height="20"/><rect x="110" y="58" width="34" height="22"/></g><g fill="${T}">${[...Array(14)].map((_,i)=>`<circle cx="${20+i*12}" cy="${84-Math.sin(i*.5)*22-i*3}" r="1.6"/>`).join('')}</g>`),
game:S(`<g stroke="${A}" stroke-width="1.4">${[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<rect x="${52+c*24}" y="${10+r*24}" width="21" height="21" rx="3" ${((r*4+c)%5===0)?`fill="${A}" fill-opacity=".25"`:''}/>`).join('')).join('')}</g>`)
};

const P_ = [
/* ---------------- 01 CAPSTONE ---------------- */
{id:'capstone',title:'Adaptive Takeoff & Landing Multirotor UAV for Uneven Surfaces',short:'Quadrotor with every motor on its own 2-DOF pan-tilt mount — it tilts thrust to stay vertical on slopes.',
 sub:'Final-Year Capstone (BCSE497J) · VIT Chennai · Guide: Dr. Sathian D',cat:['uav'],status:'hw',pill:'Capstone · Hardware',accent:'a',
 thumb:I+'og-cover.jpg',tags:['PX4','Pixhawk 6C Mini','Raspberry Pi 5','ROS 2 Jazzy','MAVROS','PCA9685','3D-printed'],
 lead:`A multirotor only takes off and lands reliably on <em>flat ground</em> — on a slope every fixed motor leans with the frame and the vehicle slides or tips. This capstone puts <em>each of the four motors on its own two-axis pan-tilt mount</em> (two MG995 servos per motor) and runs an outer tilt-compensation loop around PX4 so thrust stays near vertical while the frame sits on, or flies near, uneven terrain.`,
 links:[{l:'Read the 88-page report (PDF)',u:'assets/docs/Capstone_Report_Adaptive_Tilt_UAV.pdf',pri:1}],
 video:{src:'assets/video/adaptive_uav.mp4',poster:I+'adaptive_poster.jpg',cap:'Hand-tilt test — motors counter-rotate against the frame',label:'Play tilt demo'},
 metrics:[{v:'2.111',u:'kg',k:'all-up weight, measured'},{v:'8',k:'MG995 servos · 4 pan-tilt mounts'},{v:'90→6.7',u:'ms',k:'filter delay @ 50 Hz'},{v:'88',u:'pg',k:'report · 10-test plan'}],
 cards:[
  {t:'Mechanical design',items:['<b>Four independent 2-DOF pan-tilt mounts</b> — 3D-printed brackets, CAD-modelled before printing','Bench-verified servo range: collision near 30°/150°, <b>safe window 50°–130°</b>','Combined-tilt clamp of <b>40°</b> enforced in software; thrust budget calculated for 2.111 kg at each tilt angle']},
  {t:'Electronics & stack',am:1,items:['Pixhawk 6C Mini running <b>PX4</b> (attitude estimation, motor speed)','Raspberry Pi 5 · Ubuntu 24.04 · <b>ROS 2 Jazzy + MAVROS</b> over UART','PCA9685 16-ch PWM over I²C; dedicated 5–6 V servo supply; RC link kept independent']},
  {t:'Hybrid tilt controller',items:['<b>Leaves motor speed to PX4</b> — only vectors thrust','Source A: IMU-direct, P-only + gyro rate damping · Source B: Pixhawk-driven, with <b>0.30 s stale-data fallback</b>','EMA filter (α = 0.75), bias subtraction, 3° deadband, gain + clamp, mirrored servo map','<b>Altitude lockout</b> (2.0 m / 1.0 m hysteresis) and a GROUND → TAKEOFF → FLIGHT → LANDING state machine']},
  {t:'Engineering findings',am:1,items:['<b>Latency root-caused</b> to a 1,200 B/s MAVLink stream cap vs ~8,800 B/s needed, a 10-sample moving average and console logging — fixed all three','<b>Yaw drift isolated</b>: PX4 and the tilt loop were correcting the same axes (stable loop-off, drifting loop-on)','A takeoff crash was traced to spin-up vibration → angle & gyro deadbands and reduced takeoff damping']},
  {t:'Safety & verification',items:['Watchdog: stale IMU, stalled loop or 75° attitude trip → servos to neutral + request POSCTL','Staged bring-up: props off → hand-tilt → tethered → free flight','CSV flight logging with a combined plot of attitude, commanded tilt, relative altitude, control source and phase']},
  {t:'Status — honest version',am:1,items:['Bench mechanism + low-latency controller: <b>working</b>','Indoor IMU-only hover: <b>stable</b>, no visible servo twitch','Final hybrid controller: <b>flown</b>; measured results being compiled','10-test plan with pass criteria and risk analysis written up in the report']}
 ],
 flow:{label:'// Control architecture',boxes:[['Pixhawk 6C Mini','PX4 · attitude'],['UART','MAVLink'],['Raspberry Pi 5','ROS 2 + MAVROS'],['Hybrid tilt ctrl','EMA · deadband · clamp'],['PCA9685','I²C → PWM'],['8 × MG995','4 pan-tilt motors',1]]},
 media:[
  {src:C+'bench.jpg',cap:'Hand-tilt test, props off (Fig 5.1)'},{src:C+'indoor.jpg',cap:'Indoor hover in netted arena (Fig 5.2)'},{src:C+'outdoor.jpg',cap:'Outdoor flight tests (Fig 5.3)'},{src:C+'concept.jpg',light:1,cap:'Concept: fixed vs pan-tilt motors on a slope'},
  {src:C+'arch.jpg',light:1,cap:'System architecture'},{src:C+'layout.jpg',light:1,cap:'Motor layout, spin & PCA9685 channels'},{src:C+'brackets.jpg',cap:'CAD — pan-tilt bracket'},{src:C+'servo.jpg',light:1,cap:'Bench-found servo limits'},
  {src:C+'hybrid.jpg',light:1,cap:'Final hybrid controller sources'},{src:C+'phases.jpg',light:1,cap:'Flight-phase state machine'},{src:C+'filter.jpg',light:1,cap:'EMA vs 10-sample average'},{src:C+'flightlog.jpg',light:1,cap:'Flight log of one run (Fig 5.5)'}
 ],
 note:['STACK //','PX4 · Pixhawk 6C Mini · Raspberry Pi 5 · ROS 2 Jazzy · MAVROS · PCA9685 · MG995 · 3D-printed brackets · Python']},

/* ---------------- 02 UAV–UGV ---------------- */
{id:'uavugv',title:'Air–Ground Cooperative Path Planning for a UAV–UGV Team',short:'A drone scouts the terrain; a Jetson-powered UGV turns the point cloud into a safe path — all on embedded boards over a fault-tolerant link.',
 sub:'IEEE-format paper · VIT Chennai · Guide: Dr. Prem Shankar · with Akileshguhan A, Karthik J',cat:['air-ground','ugv','uav'],status:'hw',pill:'Air–Ground · Hardware',accent:'t',
 thumb:U+'cloud2.jpg',tags:['PX4 OFFBOARD','ROS 2 Jazzy','MAVROS','Jetson Xavier NX','RealSense D455','A*','PCA','Python'],
 lead:`Ground robots only see a few metres ahead, so steps, ditches and steep slopes are found late. Here a <em>UAV scouts the terrain and a UGV plans its own safe path from the scan</em>. The drone (Raspberry Pi + Pixhawk + RealSense D455) flies a PX4 OFFBOARD mission; the UGV's <em>Jetson Xavier NX</em> converts the cloud into a heightmap, extracts terrain features with PCA, gates every segment against a private capability model and runs A* — then both vehicles follow the plan.`,
 links:[],
 metrics:[{v:'0.71',u:'s',k:'avg live plan–fly–drive cycle'},{v:'16→0',k:'false rejections after plane-fit step height'},{v:'2.59',u:'MB/s',k:'Pi↔Jetson TCP · ~29× MAVROS serial'},{v:'<1',u:'ms',k:'UGV stop after drone abort (sim)'}],
 cards:[
  {t:'Planning pipeline (ugvnav)',items:['Point cloud → <b>heightmap</b> → graph of stations & lanes along the flight line','<b>PCA features</b>: slope only on planar patches (curvature ≤ 0.02) — step edges stopped reading as 34° inclines','<b>Step height</b> = spread of residuals around a 0.2 m plane fit','Graduated gating (accept / slow down / reject) → <b>A*</b> to the farthest reachable station']},
  {t:'Pi ↔ Jetson link',am:1,items:['Purpose-built Wi-Fi <b>TCP protocol</b>: 1 s heartbeats, 3 s loss timeout, SHA-256 integrity, acknowledgements, auto-reconnect','Atomic file writes — nothing ever appears half-saved','Measured <b>2.59 MB/s</b> (~29× the MAVROS serial link) and sent the ~0.72 MB heightmap instead of a ~41 MB raw cloud']},
  {t:'Verification (mock PX4 + dry-run UGV)',items:['Six scenarios: normal run, obstacle detour, stale paths ignored, planning failure, <b>drone abort stops UGV within 1 ms</b>, link loss','Synthetic D455 terrain: <b>0 false acceptances / 0 false rejections</b> in the normal configuration','Cycle times: 1.03 s (RPLiDAR pipeline on board), 3.58 s (D455 batch), 0.71 s (live loop)']},
  {t:'Hardware & status',am:1,items:['Drone: Raspberry Pi + Pixhawk (PX4) · UGV: Jetson Xavier NX + MPU6050 heading + L298N driver','<b>First outdoor run</b> of both vehicles completed on the boards','Future work: RealSense capture, shared localisation, full field trials']}
 ],
 flow:{label:'// Plan → fly → drive loop',boxes:[['Drone scans','D455 → .ply'],['TCP + SHA-256','Pi → Jetson'],['ugvnav','heightmap · PCA · A*'],['Path + ack','Jetson → Pi'],['PX4 OFFBOARD','drone flies path'],['UGV follows','IMU-guided',1]]},
 media:[
  {src:U+'arch.jpg',light:1,cap:'Two-computer system architecture'},{src:U+'pipeline.jpg',light:1,cap:'ugvnav planning pipeline'},{src:U+'sequence.jpg',light:1,cap:'Message sequence incl. abort paths'},{src:U+'drone.jpg',cap:'Drone build — Pi, Pixhawk, D455'},
  {src:U+'ugv.jpg',cap:'Jetson-powered UGV'},{src:U+'flight.jpg',cap:'First outdoor run — drone over the UGV'},{src:U+'cloud1.jpg',cap:'Terrain point cloud'},{src:U+'cloud3.jpg',cap:'Terrain with traversability'},
  {src:U+'path.jpg',cap:'A* path through the heightmap'},{src:U+'timing.jpg',light:1,cap:'Planning-cycle timings'},{src:U+'falserej.jpg',light:1,cap:'False rejections 16 → 0'},{src:U+'throughput.jpg',light:1,cap:'TCP vs MAVROS throughput'}
 ],
 note:['STACK //','PX4 OFFBOARD · ROS 2 Jazzy · MAVROS · Raspberry Pi · Jetson Xavier NX (JetPack 5) · RealSense D455 · MPU6050 · Python — documented in an IEEE-format paper']},

/* ---------------- 03 AERIAL TERRAIN MAPPER ---------------- */
{id:'terrain',title:'Aerial Terrain Mapper — Drone LiDAR & Orthomosaic Pipeline',short:'PX4 SITL + ROS 2 + Gazebo pipeline: waypoint survey grids, a 64-beam 3D LiDAR, and gap-free terrain reconstruction — now flying on a real drone.',
 sub:'Robotics & Drone Technology Intern · IIT Tirupati · Jun – Dec 2026',cat:['uav','perception'],status:'wip',pill:'Internship · In progress',accent:'t',art:'terrain',tags:['PX4 SITL','ROS 2','Gazebo','MAVROS','LiDAR','RViz2','Python'],
 lead:`Built during my internship at <em>IIT Tirupati</em>: a simulated drone surveys terrain with a <em>downward camera and a custom 1080×64-beam 3D LiDAR</em> (adapted from a stock single-beam sensor), stitches the captures into a 2D orthomosaic and a merged 3D terrain map, then takes the same flow onto real hardware.`,
 links:[{l:'GitHub repository',u:GH+'Aerial-Terrain-Mapper',pri:1}],
 metrics:[{v:'121',k:'captures → one orthomosaic'},{v:'64',k:'beam simulated 3D LiDAR'},{v:'11×11',k:'waypoint survey grid'}],
 cards:[
  {t:'Mission & mapping',items:['<b>Waypoint state machine</b>: fly the grid, stabilise at each point, capture timestamped LiDAR scans','<b>Pose-based tile placement</b> (coordinate-encoded filenames) replaced feature matching, which failed under drift-induced overlap','<b>Overlap-aware median-per-cell</b> point-cloud stitching removed blurry double layers']},
  {t:'Engineering fixes',am:1,items:['Matched <b>BEST_EFFORT QoS</b> between MAVROS and sensor subscriptions — stopped silently dropped data','Fixed an <b>inverted sensor-to-world axis</b>, verified against a single-peak mountain world','Pinned <code>numpy&lt;2</code> to avoid a cv_bridge break; tracked down memory growth in long runs']},
  {t:'Sim → real',items:['<b>Autonomous point-to-point waypoint flight now works on the real drone</b>; capture + stitching integration is the next release','Reconstructed clouds verified at the ground station; <b>feature-extraction pathfinding</b> finds traversable paths for UGV deployment','Started bring-up of a new UAV: Jetson Orin Nano + Pixhawk 6X on an EFT airframe']}
 ],
 flow:{label:'// Pipeline',boxes:[['Survey grid','11×11 waypoints'],['PX4 SITL','Gazebo worlds'],['LiDAR + camera','timestamped'],['World transform','sensor → map'],['Stitch','median-per-cell'],['3D map + mosaic','RViz2',1]]},
 note:['STATUS //','Simulation complete and published; hardware capture + stitching integration in progress.']},

/* ---------------- 04 SWARM ---------------- */
{id:'swarm',title:'Autonomous Swarm Rescue — Multi-Drone Search & Rescue',short:'A commander drone coordinates five X500 drones to split a search area and re-assign work when a drone fails.',
 sub:'PX4 · Gazebo · ROS 2 Humble · Micro XRCE-DDS',cat:['uav'],status:'wip',pill:'In development',accent:'a',art:'swarm',tags:['PX4 SITL','Gazebo','ROS 2 Humble','XRCE-DDS','px4_msgs','Python'],
 lead:`A simulated disaster-response swarm: an <em>Omnicopter commander</em> manages the mission while <em>five Holybro X500 drones</em> cover the search area, detect potential victims and <em>redistribute tasks</em> if a vehicle fails or loses comms.`,
 links:[{l:'GitHub repository',u:GH+'Autonomous-Swarm-Rescue',pri:1}],
 cards:[
  {t:'Architecture',items:['Six PX4 SITL instances in namespaces <code>/px4_1…/px4_5</code> + <code>/commander</code>','<b>Micro XRCE-DDS Agent</b> bridges every vehicle into ROS 2','A <code>swarm_commander</code> node handles arming, OFFBOARD mode, mission state and reassignment']},
  {t:'Mission state machine',am:1,items:['INITIALIZE → PRE_OFFBOARD → OFFBOARD → ARM → TAKEOFF → SEARCH','FAILURE / REDISTRIBUTE when a drone drops out → RETURN','One-script launch (<code>swarm_sim.py</code>); QGroundControl monitoring on ports 14550–14555']}
 ],
 note:['STATUS //','Active development — currently focused on reliable multi-vehicle arming and stable DDS communication. Multi-UAV command-and-control is the thread connecting this to the UAV–UGV work.']},

/* ---------------- 05 SLAM ---------------- */
{id:'slam',title:'RealSense-RTAB SLAM — GPS-Denied 3D Mapping',short:'Real-time visual-inertial SLAM on a Jetson Nano: RealSense D435i + RTAB-Map + MAVROS for UAVs.',
 sub:'Real-time Visual-Inertial SLAM on NVIDIA Jetson Nano',cat:['perception','uav'],status:'hw',pill:'Live hardware',accent:'t',thumb:I+'slam/slam_3dmap.jpg',tags:['ROS 2','RTAB-Map','MAVROS','Jetson Nano','RealSense D435i','C++'],
 lead:`Real-time <em>visual-inertial SLAM</em> with an Intel RealSense D435i and IMU fused through RTAB-Map, building dense 3D point-cloud maps onboard with no GPS — with MAVROS so it runs alongside a PX4 or ArduPilot flight controller.`,
 links:[{l:'GitHub repository',u:GH+'RealSense-RTAB-SLAM',pri:1}],
 video:{src:'assets/video/slam_demo.webm',poster:I+'slam/slam_terminal.jpg',cap:'RTAB-Map ROS 2 running live on Jetson Nano',label:'Play SLAM demo'},
 metrics:[{v:'~6',k:'FPS loop-closure on Jetson Nano'},{v:'<5',u:'cm',k:'drift over 20 m indoor traverse'},{v:'322+',k:'map nodes in demo session'}],
 cards:[
  {t:'What you’re seeing',items:['Jetson Nano terminal streaming live <b>rgbd_odometry</b> quality metrics via ROS 2','RTAB-Map GUI: loop-closure panel + incrementally built 3D cloud','“Throttled due to over-current” — the full stack pushing edge hardware to its limit']},
  {t:'What I validated',am:1,items:['Camera mounting, driver bring-up, loop-closure tuning','MAVLink telemetry integration via MAVROS','Pipeline transferable straight to UAV platforms']}
 ],
 media:[{src:I+'slam/slam_terminal.jpg',cap:'Jetson Nano terminal — RGBD odometry live'},{src:I+'slam/slam_3dmap.jpg',cap:'3D cloud + loop closure (node 319)'},{src:I+'slam/slam_3dmap2.jpg',cap:'Full map with odometry track (node 322)'}],
 note:['STACK //','RealSense D435i → ROS 2 Humble → rtabmap_ros → RTAB-Map → PX4 via MAVROS · NVIDIA Jetson Nano 4 GB · Ubuntu 20.04 ARM']},

/* ---------------- 06 UAV HW ---------------- */
{id:'uavhw',title:'Autonomous UAV — Physical Hardware Flight Demo',short:'Holybro X650 hovering and approaching the RHINO UGV in the VIT indoor arena — real hardware, not simulation.',
 sub:'Holybro X650 + RHINO UGV · Indoor Flight Testing · VIT Chennai',cat:['uav','air-ground'],status:'hw',pill:'Real hardware',accent:'a',thumb:I+'uav/drone_flight.jpg',tags:['PX4','MAVROS','ROS 2','Holybro X650','RHINO UGV','Jetson'],
 lead:`Live indoor flight of a <em>Holybro X650 quadrotor</em> with the RHINO UGV as an autonomous docking target, integrating the same <em>PX4 + MAVROS + ROS 2</em> interface used in simulation.`,
 links:[],
 video:{src:'assets/video/demo2.mp4',poster:I+'uav/drone_flight.jpg',cap:'Drone + RHINO UGV · VIT drone test arena',label:'Play flight demo'},
 cards:[
  {t:'Platform',items:['Frame: <b>Holybro X650</b> quadrotor · Controller: <b>PX4</b>','Companion compute: NVIDIA Jetson · Perception: RealSense D435i','Comms: MAVROS over ROS 2 · Ground robot: RHINO UGV']},
  {t:'Context',am:1,items:['Netted indoor arena — safety-compliant UAV test environment','RHINO acts as a moving landing pad for RL docking experiments','Policies trained in Gazebo, same ROS 2 interface on hardware']}
 ],
 media:[{src:I+'uav/drone_ground.jpg',cap:'RHINO UGV — ground target'},{src:I+'uav/drone_flight.jpg',cap:'Drone hovering over RHINO'},{src:I+'uav/drone_rear.jpg',cap:'Drone rear — compute stack'}]},

/* ---------------- 07 RL DOCKING ---------------- */
{id:'rl',title:'RL Drone Docking — Precision Landing with Deep RL',short:'SAC vs DDPG on a PX4 Iris quadrotor in a Dockerized PX4–ROS 2–Gazebo stack, with an IR-Lock baseline.',
 sub:'SAC vs DDPG · PX4 SITL · Dockerized Training Pipeline',cat:['uav','ai'],status:'sim',pill:'Simulation',accent:'t',art:'rl',tags:['Python','PX4','SAC','DDPG','Gazebo','ROS 2','Docker'],
 lead:`A <em>fully containerized PX4–ROS 2–Gazebo stack</em> that trains a PX4 Iris quadrotor to land on a pad with deep reinforcement learning — reproducible with a single compose command.`,
 links:[{l:'GitHub repository',u:GH+'RL-Drone-Docking-Precision-Landing-with-Deep-Reinforcement-Learning',pri:1}],
 cards:[
  {t:'Training & reward shaping',items:['<b>SAC vs DDPG</b> benchmarked on identical reward structures','Shaped rewards: proximity, velocity damping, alignment error, crash penalty','Classical <b>IR-Lock baseline controller</b> as a non-learning reference']},
  {t:'Reproducibility',am:1,items:['Isolated containers for PX4 SITL, ROS 2 bridge and the RL agent (PyTorch)','Multi-process simulation orchestrated with tmux','Fixed beacon-reset and out-of-bounds bugs so episodes run cleanly end to end']}
 ],
 flow:{label:'// Docker stack',boxes:[['PX4 SITL','container 1'],['Gazebo','physics'],['ROS 2 bridge','container 2'],['MAVROS','MAVLink ↔ ROS'],['RL agent','PyTorch'],['SAC / DDPG','policy',1]]},
 note:['STACK //','Python · PyTorch · PX4 SITL · ROS 2 · Gazebo · Docker Compose · SAC · DDPG']},

/* ---------------- 08 AUTODOCK ---------------- */
{id:'autodock',title:'Autonomous Docking — Fiducial State-Machine Docking',short:'ROS Noetic docking for differential-drive robots using fiducial markers, layered on top of move_base.',
 sub:'ROS Noetic · Differential-Drive UGV · Fiducial Markers · Sim + Real',cat:['ugv'],status:'hw',pill:'Sim + real',accent:'t',art:'dock',tags:['ROS Noetic','State Machine','Fiducials','move_base','Gazebo','Python','C++'],
 lead:`Reliable <em>state-machine docking</em> that sits on top of the ROS navigation stack — camera + fiducial markers for the final alignment, validated in Gazebo and on real hardware. The same marker-guided terminal alignment underpins the UAV→UGV docking work.`,
 links:[{l:'GitHub repository',u:GH+'autonomous-docking',pri:1}],
 cards:[
  {t:'Robustness',items:['<b>obstacle_observer</b> pauses docking in critical states until the path clears','Pause / cancel hooks for safe testing','Unique fiducial IDs prevent dock confusion']},
  {t:'Validation',am:1,items:['MockRobot + MockCharger simulation','Randomised smoke test (<code>dock_sim_test.py -c 10</code>)','TurtleBot3 front-dock and full nav-stack demos · Ubuntu 20.04 / Noetic']}
 ],
 flow:{label:'// Docking state machine',boxes:[['Goal action','AutoDocking'],['Fiducial detect','marker pose'],['PREDOCK','approach pose'],['STEER_DOCK','servo to marker'],['PARALLEL_CORRECTION','align heading'],['DOCKED','Trigger → charger',1]]}},

/* ---------------- 09 MINE ---------------- */
{id:'mine',title:'Autonomous / Manual Mine Mapping Robot',short:'Manual teleop + SLAM, assisted avoidance and frontier-based autonomous exploration in a custom underground mine world.',
 sub:'ROS 2 Humble · TurtleBot3 · Gazebo · slam_toolbox · Nav2',cat:['ugv','perception'],status:'sim',pill:'Simulation',accent:'t',thumb:I+'mine/mine_slam_rviz1.jpeg',tags:['ROS 2','Gazebo','slam_toolbox','Nav2','Python'],
 lead:`A TurtleBot3 explores a custom <em>room-and-pillar mine world</em> in Gazebo, supporting <em>manual driving, assisted obstacle avoidance and fully autonomous exploration</em> — each launched with a single command.`,
 links:[{l:'GitHub repository',u:GH+'Autonomous-or-Manual-mine-mapping-robot',pri:1}],
 video:{src:'assets/video/mine_demo.mp4',poster:I+'mine_poster.jpg',cap:'Autonomous exploration in the mine world (simulation)',label:'Play exploration demo',sim:1},
 cards:[
  {t:'Modes',items:['<b>Manual teleop + SLAM</b> — drive with keys while the map builds','<b>Assisted</b> — safety filter blocks forward motion near walls','<b>Autonomous</b> — spin to seed the map, then frontier exploration until none remain']},
  {t:'Frontier explorer',am:1,items:['Clusters free cells bordering unknown space','Targets the <b>farthest real frontier cell</b> instead of the centroid (which can land on the robot)','Goals sent to Nav2 <code>NavigateToPose</code> with <code>allow_unknown</code>; map auto-saved at the end']}
 ],
 media:[{src:I+'mine/mine_map.png',cap:'Generated map'},{src:I+'mine/mine_slam_rviz1.jpeg',cap:'RViz during exploration'},{src:I+'mine/mine_slam_rviz2.jpeg',cap:'SLAM state + map overlay'},{src:I+'mine/mine_demo.gif',cap:'Exploration animation'}]},

/* ---------------- 10 MONO VO ---------------- */
{id:'monovo',title:'Monocular Visual Odometry with Dynamic Object Masking',short:'YOLO + Mask R-CNN remove moving objects before SuperPoint/SuperGlue pose estimation — fallback odometry for GPS-denied UAVs.',
 sub:'Fallback Odometry for GPS-Denied UAVs · KITTI Evaluated',cat:['perception','ai'],status:'sim',pill:'KITTI evaluated',accent:'a',art:'vo',tags:['Python','PyTorch','SuperGlue','YOLO','Mask R-CNN','KITTI'],
 lead:`A three-stage pipeline that <em>zeroes out dynamic pixels</em> (people, cars, bikes) before feature extraction, then recovers 6-DoF pose from <em>SuperPoint + SuperGlue</em> matches — evaluated on dynamic KITTI sequences against ORB-SLAM2.`,
 links:[{l:'GitHub repository',u:GH+'Monocular-Visual-Odometry-with-Dynamic-Object-Masking',pri:1}],
 cards:[
  {t:'Stages',items:['<b>1 Masking</b> — YOLO detects dynamic classes, Mask R-CNN gives pixel masks','<b>2 Matching</b> — SuperPoint keypoints + SuperGlue GNN matching, RANSAC verification','<b>3 Pose</b> — essential-matrix decomposition, scale approximation, accumulated trajectory']},
  {t:'Evaluation & use',am:1,items:['KITTI dynamic sequences 05, 09, 10','Masked pipeline keeps a coherent trajectory where ORB-SLAM2 jumps','Designed as secondary odometry when GPS and stereo depth fail on a UAV']}
 ],
 flow:{label:'// Pipeline',boxes:[['Frame','monocular'],['YOLO','detect'],['Mask R-CNN','segment'],['Masked frame','static only',1],['SuperPoint + SuperGlue','match'],['6-DoF pose','trajectory']]}},

/* ---------------- 11 CODE OPTIMIZER ---------------- */
{id:'codeopt',title:'Code Optimizer AI — Makeathon Winner',short:'AST-powered multi-language code optimizer with real-time suggestions. 1st place among 40+ teams, led to an L&T internship offer.',
 sub:'1st Place · L&T × Innova Makeathon',cat:['software','ai'],status:'',pill:'🏆 1st place',accent:'a',art:'learn',tags:['React','Vite','Node.js','AST Parsing','WebSockets'],
 lead:`A web platform that parses code into an <em>AST</em> to detect inefficiencies, anti-patterns and bugs across JavaScript, TypeScript, Python, Java and C++, streaming suggestions over WebSockets and showing a side-by-side original vs optimized diff. It <em>won 1st place among 40+ teams</em> and earned a full internship offer from Larsen & Toubro.`,
 links:[{l:'GitHub repository',u:GH+'code-optimizer-AI',pri:1}],
 cards:[
  {t:'Features',items:['Real-time suggestions as you type','Time/space complexity analysis; multiple options with trade-offs','Estimated execution-time and memory impact; export + version compare']},
  {t:'Architecture',am:1,items:['React + Vite frontend, Node.js backend','AST parsing for deep code understanding','WebSockets for instant feedback; customisable rules']}
 ]},

/* ---------------- 12 EVA ---------------- */
{id:'eva',title:'EVA — Empathetic Voice Assistant for Elderly Healthcare',short:'Offline-first voice companion: Whisper ASR, patient memory from documents, medical LLM, calm TTS.',
 sub:'Whisper ASR · Medical LLM · Offline TTS · Dec 2025',cat:['ai'],status:'',pill:'AI · Healthcare',accent:'p',art:'voice',tags:['Whisper','Medical LLM','FAISS','PyAudio','pyttsx3','Python'],
 lead:`A voice-first assistant that turns <em>speech and medical documents</em> (PDF/DOCX/TXT) into a persistent patient record and responds slowly and calmly. <em>Advisory only</em> — it never diagnoses and escalates high-risk vitals to a doctor or caregiver.`,
 links:[{l:'GitHub repository',u:GH+'EVA-Empathetic-Voice-Assistant-for-Elderly-Healthcare',pri:1}],
 cards:[{t:'Design',items:['<b>Offline-first</b> — Whisper + TTS run locally','Modular pipeline: asr · memory · ingest · llm · tts','Persistent JSON memory: vitals, conditions, medications, query log']},{t:'Safety',am:1,items:['No diagnoses; safety over conversational continuity','High-risk vitals → advise doctor / caregiver / emergency services']}],
 flow:{label:'// Voice pipeline',boxes:[['Mic','PyAudio'],['Whisper STT','offline'],['Memory','JSON'],['Medical LLM','contextual'],['TTS','slow & calm'],['Voice reply','',1]]}},

/* ---------------- 13 IPL RAG ---------------- */
{id:'ipl',title:'IPL Agentic RAG System',short:'Hand-built ReAct agent with FAISS search, Pandas analytics and live web search — no agent framework.',
 sub:'Multi-tool ReAct Agent · FAISS · CSV Analytics · Tavily',cat:['ai'],status:'',pill:'AI · Agents',accent:'g',art:'rag',tags:['GPT-4','FAISS','Tavily','Pandas','TF-IDF + LSA','Python'],
 lead:`An <em>explicit while-loop ReAct agent</em> (no LangChain AgentExecutor) that routes questions across three tools — semantic search over IPL PDF reports, Pandas queries over match CSVs, and live web search — with a hard step cap and a structured JSON trace.`,
 links:[{l:'GitHub repository',u:GH+'IPL-Agentic-RAG-System',pri:1}],
 cards:[{t:'Tools',items:['<b>search_docs</b> — FAISS over IPL 2023–24 reports (TF-IDF + LSA, 256-d)','<b>query_data</b> — Pandas aggregations over match CSVs','<b>web_search</b> — Tavily for live news']},{t:'Safety',am:1,items:['Hard 8-step cap and loop detection','Off-topic refusals','Every step logged: tool, input, result, reason, duration']}]},

/* ---------------- 14 WELLNESS ---------------- */
{id:'wellness',title:'AI Student Wellness Coach',short:'Conversational assistant offering guidance on student stress, well-being and academic challenges.',
 sub:'Google Gemini · TypeScript · Vite',cat:['software','ai'],status:'',pill:'Web app',accent:'g',art:'care',tags:['TypeScript','React','Vite','Gemini API'],
 lead:`A web-based <em>conversational coach</em> that gives students personalised guidance on stress, well-being and academic pressure, built on the Google Gemini API.`,
 links:[{l:'GitHub repository',u:GH+'AI-Student-Wellness-Coach',pri:1}]},

/* ---------------- 15 SKILL EXCHANGE ---------------- */
{id:'skill',title:'Skill Exchange — E-Learning Platform',short:'Next.js platform connecting learners with expert instructors — catalogs, dashboards, payments, certificates.',
 sub:'Next.js · TypeScript · Firebase · Tailwind',cat:['software'],status:'',pill:'Full-stack',accent:'t',art:'learn',tags:['Next.js','TypeScript','Firebase','Tailwind','shadcn/ui'],
 lead:`A full-stack <em>e-learning marketplace</em> with a searchable course catalog, separate student and instructor dashboards, progress tracking, payments, auto-issued certificates and per-course discussion forums.`,
 links:[{l:'GitHub repository',u:GH+'skill-exchange-platform',pri:1}],
 cards:[{t:'Stack',items:['Next.js + React + TypeScript, Tailwind & shadcn/ui','Firebase Auth, Firestore and Storage','Context API state · deployed on Vercel']}]},

/* ---------------- 16 2048 ---------------- */
{id:'g2048',title:'2048 — React Puzzle Game',short:'Classic 2048 recreated in React + SCSS with arrow-key controls and best-score tracking.',
 sub:'React · SCSS',cat:['software'],status:'',pill:'Web app',accent:'a',art:'game',tags:['React','SCSS','JavaScript'],
 lead:`A faithful <em>browser version of 2048</em> built with React and modular SCSS — arrow-key play, live and best score, one-click restart.`,
 links:[{l:'GitHub repository',u:GH+'2048-game',pri:1}]}
];

const byId=Object.fromEntries(P_.map(p=>[p.id,p]));
/* keep old deep links (projects.html#p1 …) working */
Object.entries({p1:'slam',p2:'uavhw','mine-project':'mine',p3:'rl',p4:'autodock',p5:'monovo',p6:'codeopt',p7:'eva',p8:'ipl'}).forEach(([k,v])=>byId[k]=byId[v]);

const CAT={uav:'UAV',ugv:'UGV','air-ground':'AIR–GROUND',perception:'PERCEPTION',ai:'AI/ML',software:'SOFTWARE'};
const pillCls={hw:'pill-hw',sim:'pill-sim',wip:'pill-wip','':'pill-win'};
const num=p=>String(P_.indexOf(p)+1).padStart(2,'0');
const playBtn=l=>`<button class="ov" aria-label="${l}"><span class="ring"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-left:3px"><polygon points="5,3 19,12 5,21"/></svg></span><span class="lbl">${l}</span></button>`;

function card(p){
  const th=p.thumb?`<img src="${p.thumb}" alt="" loading="lazy" class="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"/>`
    :`<div class="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(168,199,255,.07),transparent_70%)] p-6"><div class="h-full w-4/5 [&>svg]:h-full [&>svg]:w-full">${ART[p.art]||''}</div></div>`;
  return `<button class="pcard card group reveal flex flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-1 hover:border-ice/40 ${p.feat?'md:col-span-2':''}" data-id="${p.id}" data-cat="${p.cat.join(' ')}" aria-label="Open ${p.title}">
    <div class="relative m-2 overflow-hidden rounded-[20px] bg-void ${p.feat?'aspect-[16/10] md:aspect-[21/9]':'aspect-[16/10]'}">${th}
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"></div>
      ${p.pill?`<span class="pill ${pillCls[p.status||'']} absolute left-3 top-3">${p.pill}</span>`:''}
      <span class="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-fg backdrop-blur transition duration-300 group-hover:rotate-[-45deg] group-hover:bg-ice group-hover:text-void">→</span></div>
    <div class="flex flex-1 flex-col px-6 pb-6 pt-4">
      <div class="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[.18em] text-dim"><span class="text-ice">PRJ.${num(p)}</span><span>${p.cat.map(c=>CAT[c]).join(' · ')}</span></div>
      <h3 class="font-display text-[1.02rem] font-semibold uppercase leading-snug tracking-[-.01em]">${p.title}</h3>
      <p class="mt-3 flex-1 text-sm leading-relaxed text-dim">${p.short}</p>
      <div class="mt-5 flex flex-wrap gap-1.5">${p.tags.slice(0,4).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div></button>`;
}

function drawerHTML(p){
  const metrics=p.metrics?`<div class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">${p.metrics.map(m=>`<div class="kpi rounded-2xl border border-white/10 bg-white/[.03] p-4"><div class="v">${m.v}${m.u?`<small>${m.u}</small>`:''}</div><div class="k">${m.k}</div></div>`).join('')}</div>`:'';
  const video=p.video?`<div class="mt-8"><div class="vf"><span class="rec ${p.video.sim?'sim':''}"><i></i>${p.video.sim?'SIM':'REC'}</span>
    <video preload="none" playsinline loop muted poster="${p.video.poster}"><source src="${p.video.src}"/></video><div class="bar"></div>${playBtn(p.video.label)}</div>
    <div class="fig-cap">${p.video.cap}</div></div>`:'';
  const flow=p.flow?`<div class="mt-10"><div class="label mb-4"><b>●</b> ${p.flow.label.replace('// ','')}</div><div class="flex flex-wrap items-stretch gap-y-2 rounded-2xl border border-white/10 bg-white/[.02] p-4">${p.flow.boxes.map((b,k)=>`${k?'<span class="self-center px-2 font-mono text-dim">→</span>':''}<div class="rounded-xl border px-3 py-2 text-center font-mono text-[11px] leading-snug ${b[2]?'border-ice/60 bg-ice/10 text-fg':'border-white/15'}">${b[0]}${b[1]?`<small class="block text-[9px] uppercase tracking-wider text-dim">${b[1]}</small>`:''}</div>`).join('')}</div></div>`:'';
  const cards=p.cards?`<div class="mt-10 grid gap-4 md:grid-cols-2">${p.cards.map(c=>`<div class="rounded-2xl border border-white/10 bg-white/[.03] p-5"><h4 class="mb-3 font-mono text-[11px] font-medium uppercase tracking-[.14em] ${c.am?'text-ice':'text-steel'}">${c.t}</h4><ul class="bul">${c.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`:'';
  const media=p.media?`<div class="mt-10"><div class="label mb-4"><b>●</b> Gallery — click to enlarge</div><div class="grid grid-cols-2 gap-3 md:grid-cols-4">${p.media.map(m=>`<button class="shot ${m.light?'light':''}" data-zoom="${m.src}" data-cap="${m.cap}"><img src="${m.src}" alt="${m.cap}" loading="lazy"/><span class="cap">${m.cap}</span></button>`).join('')}</div></div>`:'';
  const links=p.links&&p.links.length?`<div class="mt-7 flex flex-wrap gap-3">${p.links.map(l=>`<a class="btn ${l.pri?'btn-ice':'btn-line'}" href="${l.u}" target="_blank" rel="noopener">${l.l} ↗</a>`).join('')}</div>`:'';
  const note=p.note?`<div class="mt-10 rounded-2xl border border-dashed border-white/15 p-4 font-mono text-[11px] leading-relaxed text-dim"><b class="font-medium text-ice">${p.note[0]}</b> ${p.note[1]}</div>`:'';
  return `<div class="p-6 md:p-10">
    <div class="mb-8 flex items-start justify-between gap-4"><div class="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] text-dim"><span class="text-ice">PRJ.${num(p)}</span>${p.pill?`<span class="pill ${pillCls[p.status||'']}">${p.pill}</span>`:''}</div>
      <button class="dclose btn btn-line shrink-0 !px-4 !py-2" aria-label="Close case file">Close ✕</button></div>
    <h2 id="dtitle" class="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold uppercase leading-[1.06] tracking-[-.02em]">${p.title}</h2>
    <div class="mt-4 font-mono text-[11px] uppercase tracking-[.1em] text-steel">${p.sub}</div>
    <div class="mt-4 flex flex-wrap gap-1.5">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    <p class="lead mt-7 max-w-3xl text-[1.02rem] leading-relaxed text-dim">${p.lead}</p>${links}${video}${metrics}${flow}${cards}${media}${note}</div>`;
}

/* drawer plumbing */
let back;
function ensureDrawer(){
  if(back)return back;
  back=document.createElement('div');back.className='drawer-back';back.setAttribute('role','dialog');back.setAttribute('aria-modal','true');back.setAttribute('aria-labelledby','dtitle');
  back.innerHTML='<div class="drawer"></div>';document.body.appendChild(back);
  back.addEventListener('click',e=>{if(e.target===back||e.target.closest('.dclose'))closeProject()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&back.classList.contains('open')&&!document.querySelector('.lb.open'))closeProject()});
  return back;
}
let lastFocus=null;
function openProject(id,push=true){
  const p=byId[id];if(!p)return;ensureDrawer();lastFocus=document.activeElement;
  const d=back.querySelector('.drawer');d.innerHTML=drawerHTML(p);d.scrollTop=0;
  back.classList.add('open');document.body.style.overflow='hidden';
  window.initVideos&&initVideos(d);d.querySelector('.dclose').focus();
  if(push)history.replaceState(null,'','#'+p.id);
}
function closeProject(){
  if(!back)return;window.pauseAllVideos&&pauseAllVideos(back);back.classList.remove('open');document.body.style.overflow='';
  history.replaceState(null,'',location.pathname+location.search);if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
window.openProject=openProject;

document.addEventListener('click',e=>{
  const c=e.target.closest('.pcard');if(c){openProject(c.dataset.id);return}
  const o=e.target.closest('[data-open]');if(o){e.preventDefault();openProject(o.dataset.open)}
});

function mount(){
  document.querySelectorAll('[data-grid]').forEach(g=>{
    const ids=g.dataset.grid==='all'?P_.map(p=>p.id):g.dataset.grid.split(',');
    const feat=(g.dataset.feat||'').split(',');
    g.innerHTML=ids.map(id=>{const p=byId[id];p.feat=feat.includes(id);return card(p)}).join('');
  });
  window.observeReveals&&observeReveals();
  const fb=document.getElementById('filters');
  if(fb){
    const grid=document.querySelector('[data-grid]'),cnt=document.getElementById('fcount'),feat=(grid.dataset.feat||'').split(',');
    const apply=f=>{let n=0;grid.querySelectorAll('.pcard').forEach(c=>{const ok=f==='all'||c.dataset.cat.split(' ').includes(f);c.classList.toggle('hide',!ok);if(ok)n++;
      c.classList.toggle('md:col-span-2',f==='all'&&feat.includes(c.dataset.id))});
      cnt.textContent=String(n).padStart(2,'0')+' / '+P_.length+' SYSTEMS';
      fb.querySelectorAll('button').forEach(b=>{const on=b.dataset.f===f;b.setAttribute('aria-pressed',on);
        b.classList.toggle('!bg-ice',on);b.classList.toggle('!text-void',on);b.classList.toggle('!border-ice',on)})};
    fb.addEventListener('click',e=>{const b=e.target.closest('button[data-f]');if(b)apply(b.dataset.f)});
    apply('all');
  }
  if(location.hash&&byId[location.hash.slice(1)])openProject(location.hash.slice(1),false);
}
mount();
addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(byId[id])openProject(id,false)});
})();
