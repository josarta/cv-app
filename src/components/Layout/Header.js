import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import withBadge from 'hocs/withBadge';
import flgUno from 'assets/flags/blue.png'
import flgDos from 'assets/flags/red.jpg'
import flgTres from 'assets/flags/green.png'

import React from 'react';
import {
  MdClearAll,
  MdNotificationsActive,
  MdNotificationsNone,
} from 'react-icons/md';
import {
  Button,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>3</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificaciones: [],
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
    };
  }

  

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();
  };




  handleResponseErrorInicio(response) {
    throw new Error("HTTP error, status = " + response.status);
  }
  handleErrorInicio(error) {
    console.log(error.message);
  }

  cargaIsoInicio(request) {
    fetch(request)
      .then(response => {
        if (!response.ok) {
          this.handleResponseErrorInicio(response);
        }
        return response.json();
      })
      .then(json => {

        let f = new Date();
        let dia = (f.getDate() < 10 ? '0' : '') + f.getDate();
        let mes = ((f.getMonth() + 1) < 10 ? '0' : '') + (f.getMonth() + 1);
        f = dia + "/" + mes + "/" + f.getFullYear();
        let notificaciones = [];
        let notifiUno = {
          id: 1,
          avatar: flgUno,
          message: 'Confirmados : ',
          valor: json[0].hasOwnProperty('confirmed') ? json[0].confirmed.toLocaleString(): "0",
          date: f,
        };
        let notifiDos = {
          id: 2,
          avatar: flgDos,
          message: 'Muertes : ',
          valor: json[0].hasOwnProperty('deaths') ? json[0].deaths.toLocaleString(): "0",
          date: f,
        };
        let notifiTres = {
          id: 3,
          avatar: flgTres,
          message:'Recuperados : ',
          valor: json[0].hasOwnProperty('recovered') ? json[0].recovered.toLocaleString(): "0",
          date: f,
        };
        notificaciones.push(notifiUno);
        notificaciones.push(notifiDos);
        notificaciones.push(notifiTres);
        this.setState({ notificaciones: notificaciones });
      })
      .catch(error => {
        this.handleErrorInicio(error);
      });
  }


  componentDidMount() {
      let url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest';
      let iso = 'iso3';
      let valueIso = 'COL';
      const requestUni = new Request(
        url + '?' + iso + '=' + valueIso, {
        method: 'GET',
      });
      this.cargaIsoInicio(requestUni);
  }


  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                  <MdNotificationsActiveWithBadge
                    size={25}
                    className="text-secondary can-click animated swing infinite"
                    onClick={this.toggleNotificationPopover}
                  />
                )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={this.state.notificaciones} />
              </PopoverBody>
            </Popover>
          </NavItem>

        </Nav>
      </Navbar>
    );
  }
}

export default Header;
