import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import HAMBURGER_ICON from '@salesforce/resourceUrl/marketingHamburgerIcon';
import X_ICON from '@salesforce/resourceUrl/marketingXIcon';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';
import getLogoutUrl from '@salesforce/apex/applauncher.IdentityHeaderController.getLogoutUrl';


/**
 * This is a custom LWC navigation menu component.
 * Make sure the Guest user profile has access to the NavigationMenuItemsController apex class.
 */
export default class NavigationMenu extends NavigationMixin(LightningElement) {
    @api buttonLabel;
    @api buttonRedirectPageAPIName;
    @api menuName;

    isGuestUser = isGuestUser;
    logoutUrl = getLogoutUrl;
    error;
    href = basePath;
    isLoaded;
    menuItems = [];
/*     exampleMenuItem = {
		"Status": "Draft",
		"Target": "/account-portal",
		"Type": "InternalLink",
		"AccessRestriction": "LoginRequired",
		"Position": 1,
		"Label": "Account Portal",
		"TargetPrefs": "None",
		"Id": "-------"
	} */

    publishedState;
    showHamburgerMenu;

    hamburgerIcon = HAMBURGER_ICON;
    xIcon = X_ICON;

    @wire(getNavigationMenuItems, {
        menuName: '$menuName',
        publishedState: '$publishedState'
    })
    // load the public items from the nav bar in the experience site
    wiredMenuItems({ error, data }) {
        console.log('home isGuest', isGuestUser)
        if (data && !this.isLoaded) {
            this.menuItems = data.map((item, index) => {
                return {
                    target: item.Target,
                    id: index,
                    label: item.Label,
                    defaultListViewId: item.DefaultListViewId,
                    type: item.Type,
                    accessRestriction: item.AccessRestriction
                };
            })
            .filter((item) => {
                // Only show "Public" items if guest user
                return (
                    item.accessRestriction === 'None' ||
                    (item.accessRestriction === 'LoginRequired' &&
                        !isGuestUser)
                );
            });


            this.error = undefined;
            this.isLoaded = true;

        } else if (error) {
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
            console.log(`Navigation menu error: ${JSON.stringify(this.error)}`);
        }
    }

    // determine if we are in the site builder or a deployed environemnt
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app =
            currentPageReference &&
            currentPageReference.state &&
            currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishedState = 'Draft';
        } else {
            this.publishedState = 'Live';
        }
    }

    handleClick() {
        const sitePrefix = basePath.replace("/", "");
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/${sitePrefix}login`
            }
        });
    }

    handleLogOut() {
        const sitePrefix = basePath.replace("/", "");

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/${sitePrefix}vforcesite/secur/logout.jsp`
            }
        })
    }

    handleHamburgerMenuToggle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.showHamburgerMenu) {
            this.showHamburgerMenu = false;
        } else {
            this.showHamburgerMenu = true;
        }
    }

    connectedCallback() {
        console.log('home isGuest', isGuestUser);
    }

}
